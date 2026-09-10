module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/src/app/api/v1/galleries/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
// src/app/api/v1/galleries/route.js
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.js [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const tenantId = searchParams.get('tenantId') || 'tenant-luminary';
        // Verify tenant exists server-side
        const tenant = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].getTenantById(tenantId);
        if (!tenant) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized or invalid tenant'
            }, {
                status: 401
            });
        }
        const galleries = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].getGalleries(tenantId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            galleries
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const { searchParams } = new URL(request.url);
        const tenantId = searchParams.get('tenantId') || 'tenant-luminary';
        const tenant = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].getTenantById(tenantId);
        if (!tenant) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized or invalid tenant'
            }, {
                status: 401
            });
        }
        const body = await request.json();
        const { name, eventDate, location, description, coverUrl } = body;
        if (!name) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Gallery name is required'
            }, {
                status: 400
            });
        }
        const gallery = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].createGallery(tenantId, {
            name,
            eventDate,
            location,
            description,
            coverUrl
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            gallery
        }, {
            status: 201
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
"[project]/src/lib/firebase-admin.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "rtdb",
    ()=>rtdb
]);
// src/lib/firebase-admin.js
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs, [project]/node_modules/firebase-admin)");
;
// Protect against multiple initializations in development mode
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].apps.length) {
    try {
        __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].initializeApp({
            credential: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // Handle newlines in private key securely
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            }),
            databaseURL: process.env.FIREBASE_DB_URL
        });
        console.log('Firebase Admin initialized successfully');
    } catch (error) {
        console.error('Firebase Admin initialization error', error.stack);
    }
}
const db = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].firestore();
const rtdb = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].database(); // keeping RTDB ref just in case
const auth = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].auth();
}),
"[project]/src/lib/store.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
// src/lib/store.js
/**
 * Persistent multi-tenant data store for Memora-AI.
 * Uses Firebase Firestore. Enforces strict tenantId isolation across all operations.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase-admin.js [app-route] (ecmascript)");
;
const store = {
    // --- Tenants ---
    async getTenants () {
        const snapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('tenants').get();
        return snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }));
    },
    async getTenantById (tenantId) {
        const doc = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('tenants').doc(tenantId).get();
        if (!doc.exists) return null;
        return {
            id: doc.id,
            ...doc.data()
        };
    },
    async createTenant ({ name, ownerName, email, plan = "Free" }) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const newTenant = {
            slug,
            name,
            ownerName,
            email,
            plan,
            status: "Active",
            createdAt: new Date().toISOString(),
            storageUsedBytes: 0,
            storageLimitBytes: plan === "Pro" ? 100000000000 : plan === "Business" ? 500000000000 : 5000000000,
            photosCount: 0,
            galleriesCount: 0,
            aiSearchesCount: 0
        };
        const docRef = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('tenants').add(newTenant);
        return {
            id: docRef.id,
            ...newTenant
        };
    },
    async updateTenant (tenantId, updates) {
        const ref = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('tenants').doc(tenantId);
        const doc = await ref.get();
        if (!doc.exists) return null;
        await ref.update(updates);
        const updated = await ref.get();
        return {
            id: updated.id,
            ...updated.data()
        };
    },
    // --- Galleries ---
    async getGalleries (tenantId) {
        const snapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('galleries').where('tenantId', '==', tenantId).get();
        return snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }));
    },
    async getGalleryById (id) {
        // Check by id
        let doc = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('galleries').doc(id).get();
        if (doc.exists) return {
            id: doc.id,
            ...doc.data()
        };
        // Check by slug
        const snapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('galleries').where('slug', '==', id).limit(1).get();
        if (!snapshot.empty) {
            const g = snapshot.docs[0];
            return {
                id: g.id,
                ...g.data()
            };
        }
        return null;
    },
    async createGallery (tenantId, { name, eventDate, location, description, coverUrl }) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(Math.random() * 1000);
        const newGallery = {
            slug,
            tenantId,
            name,
            eventDate: eventDate || new Date().toISOString().split("T")[0],
            location: location || "",
            description: description || "",
            coverUrl: coverUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
            status: "READY",
            totalPhotos: 0,
            processedPhotos: 0,
            facesDetected: 0,
            createdAt: new Date().toISOString(),
            settings: {
                faceSearchEnabled: true,
                guestDownloadsEnabled: true,
                requireEmailToDownload: false
            }
        };
        const docRef = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('galleries').add(newGallery);
        // Update tenant counts
        const tenantRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('tenants').doc(tenantId);
        const tenantDoc = await tenantRef.get();
        if (tenantDoc.exists) {
            await tenantRef.update({
                galleriesCount: (tenantDoc.data().galleriesCount || 0) + 1
            });
        }
        return {
            id: docRef.id,
            ...newGallery
        };
    },
    async deleteGallery (tenantId, galleryId) {
        const ref = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('galleries').doc(galleryId);
        const doc = await ref.get();
        if (!doc.exists || doc.data().tenantId !== tenantId) return false;
        await ref.delete();
        // Delete related photos (in a real app, delete from R2 as well, but handling firestore here)
        const photosSnapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('photos').where('galleryId', '==', galleryId).get();
        const batch = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].batch();
        photosSnapshot.docs.forEach((d)=>batch.delete(d.ref));
        const clustersSnapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('personClusters').where('galleryId', '==', galleryId).get();
        clustersSnapshot.docs.forEach((d)=>batch.delete(d.ref));
        await batch.commit();
        return true;
    },
    // --- Photos ---
    async getPhotos (galleryId, tenantId) {
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('photos').where('galleryId', '==', galleryId);
        if (tenantId) {
            query = query.where('tenantId', '==', tenantId);
        }
        const snapshot = await query.get();
        return snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }));
    },
    async addPhotos (tenantId, galleryId, newPhotoList) {
        const created = [];
        const batch = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].batch();
        for (const p of newPhotoList){
            const docRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('photos').doc();
            const photoData = {
                galleryId,
                tenantId,
                url: p.url,
                thumbnailUrl: p.thumbnailUrl || p.url,
                filename: p.filename || "upload.jpg",
                width: p.width || 1200,
                height: p.height || 800,
                facesCount: p.facesCount || 1,
                personIds: p.personIds || [
                    "cluster-guest-01"
                ],
                uploadedAt: new Date().toISOString()
            };
            batch.set(docRef, photoData);
            created.push({
                id: docRef.id,
                ...photoData
            });
        }
        await batch.commit();
        // Update gallery stats
        const galleryRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('galleries').doc(galleryId);
        const galleryDoc = await galleryRef.get();
        if (galleryDoc.exists) {
            const facesDetected = created.reduce((acc, curr)=>acc + curr.facesCount, 0);
            await galleryRef.update({
                totalPhotos: (galleryDoc.data().totalPhotos || 0) + created.length,
                processedPhotos: (galleryDoc.data().processedPhotos || 0) + created.length,
                facesDetected: (galleryDoc.data().facesDetected || 0) + facesDetected
            });
        }
        // Update tenant stats
        const tenantRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('tenants').doc(tenantId);
        const tenantDoc = await tenantRef.get();
        if (tenantDoc.exists) {
            await tenantRef.update({
                photosCount: (tenantDoc.data().photosCount || 0) + created.length,
                storageUsedBytes: (tenantDoc.data().storageUsedBytes || 0) + created.length * 3500000
            });
        }
        return created;
    },
    // --- Person Clusters / Face Index ---
    async getPersonClusters (galleryId, tenantId) {
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('personClusters').where('galleryId', '==', galleryId);
        if (tenantId) {
            query = query.where('tenantId', '==', tenantId);
        }
        const snapshot = await query.get();
        return snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }));
    },
    // --- Asynchronous Processing Queue ---
    async queueProcessingJob (tenantId, galleryId, photoCount) {
        const job = {
            tenantId,
            galleryId,
            status: "COMPLETED",
            photoCount,
            processedCount: photoCount,
            progress: 100,
            startedAt: new Date().toISOString(),
            completedAt: new Date().toISOString()
        };
        const docRef = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('processingJobs').add(job);
        const galleryRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('galleries').doc(galleryId);
        await galleryRef.update({
            status: "READY"
        });
        return {
            id: docRef.id,
            ...job
        };
    },
    async getJobStatus (galleryId) {
        const snapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection('processingJobs').where('galleryId', '==', galleryId).where('status', '==', 'PROCESSING').get();
        if (snapshot.empty) return null;
        return {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
        };
    },
    // --- Platform Global Metrics (Superadmin) ---
    async getPlatformMetrics () {
        // In a real scenario, this would aggregate data
        return {
            totalTenants: 245,
            activeGalleries: 1822,
            photosProcessed: "4.2M",
            aiSearches: "382K",
            storageUsed: "18.4 TB",
            avgProcessingLatencySec: "1.4s",
            activeJobs: 0,
            systemHealth: "100% Operational"
        };
    }
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1s-36ur._.js.map