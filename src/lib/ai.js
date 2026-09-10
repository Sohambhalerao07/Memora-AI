// src/lib/ai.js
/**
 * Face vector generation & similarity matching engine for Memora-AI.
 * Uses DeepFace via the local ai_service.py Python microservice.
 */

import { store } from './store';

// We assume the Python microservice is running locally for now
const AI_SERVICE_URL = 'http://localhost:5000';

/**
 * Calculates cosine similarity between two 1D numerical vectors.
 */
export function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Calls the Python microservice to extract face embeddings from an image.
 */
export async function extractFaceVectors(imageUrl) {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/extract_faces`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: imageUrl }),
    });

    if (!response.ok) {
      throw new Error(`AI service responded with ${response.status}`);
    }

    const data = await response.json();
    return data.faces || []; // Array of { embedding, facial_area, confidence }
  } catch (error) {
    console.error("Error connecting to AI service:", error);
    return [];
  }
}

/**
 * Performs AI face matching for a guest selfie against a specific gallery.
 *
 * @param {string} galleryId - The target gallery identifier.
 * @param {string} selfieUrl - The URL of the uploaded guest selfie.
 * @returns {Promise<{ matches: Array, totalSearched: number, searchTimeMs: number }>}
 */
export async function matchGuestSelfie(galleryId, selfieUrl) {
  const startTime = performance.now();

  const gallery = await store.getGalleryById(galleryId);
  if (!gallery) {
    throw new Error(`Gallery "${galleryId}" not found`);
  }

  // Extract embedding for the selfie
  const selfieFaces = await extractFaceVectors(selfieUrl);
  if (!selfieFaces.length) {
    return { matches: [], totalSearched: 0, searchTimeMs: Math.round(performance.now() - startTime) };
  }
  
  // Use the primary face found in the selfie
  const targetEmbedding = selfieFaces[0].embedding;

  // Fetch all photos scoped to this gallery
  // Note: For a highly scalable system, we should use a vector database (like Pinecone/Milvus)
  // but for now, we iterate over Firestore records and compute similarity locally.
  const galleryPhotos = await store.getPhotos(gallery.id);

  if (galleryPhotos.length === 0) {
    return {
      matches: [],
      totalSearched: 0,
      searchTimeMs: Math.round(performance.now() - startTime),
    };
  }

  // Increment tenant AI searches count
  const tenant = await store.getTenantById(gallery.tenantId);
  if (tenant) {
    await store.updateTenant(tenant.id, {
      aiSearchesCount: (tenant.aiSearchesCount || 0) + 1
    });
  }

  // Score each photo
  const scoredPhotos = galleryPhotos.map((photo) => {
    let maxConfidence = 0;
    
    // In a real implementation, photo.faces would be populated during upload.
    // Assuming photo.faces is an array of { embedding, ... }
    if (photo.faces && Array.isArray(photo.faces)) {
      for (const face of photo.faces) {
        const similarity = cosineSimilarity(targetEmbedding, face.embedding);
        const confidence = Math.round(similarity * 100);
        if (confidence > maxConfidence) {
          maxConfidence = confidence;
        }
      }
    } else {
      // Mock fallback if photo has no actual faces processed yet
      maxConfidence = Math.round(20 + Math.random() * 20);
    }

    return {
      ...photo,
      matchConfidence: maxConfidence,
    };
  });

  // Filter photos meeting threshold (>= 75% confidence typically for face embeddings)
  const matches = scoredPhotos
    .filter((p) => p.matchConfidence >= 75)
    .sort((a, b) => b.matchConfidence - a.matchConfidence);

  const searchTimeMs = Math.round(performance.now() - startTime);

  return {
    matches,
    totalSearched: galleryPhotos.length,
    searchTimeMs,
  };
}
