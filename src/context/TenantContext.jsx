// src/context/TenantContext.jsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const TenantContext = createContext(null);

export function TenantProvider({ children }) {
  const [currentTenantId, setCurrentTenantId] = useState('tenant-luminary');
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('Tenant Owner'); // 'Tenant Owner' | 'Photographer' | 'Platform Admin'

  const fetchTenant = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/tenants?tenantId=${id}`);
      const data = await res.json();
      if (data.success) {
        setTenant(data.tenant);
      }
    } catch (err) {
      console.error('Failed to fetch tenant:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenant(currentTenantId);
  }, [currentTenantId]);

  const switchTenant = (newTenantId) => {
    setCurrentTenantId(newTenantId);
  };

  return (
    <TenantContext.Provider
      value={{
        currentTenantId,
        tenant,
        role,
        setRole,
        switchTenant,
        refreshTenant: () => fetchTenant(currentTenantId),
        loading,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
