'use client';

import { Building, Dormitory } from '@/lib/type';
import { useEffect, useState } from 'react';
import Script from 'next/script';

// Declare Leaflet types for TypeScript
declare global {
  interface Window {
    L: any;
  }
}

interface UniversalMapProps {
  singleDormitory?: Dormitory;
  title?: string;
  fetchAllDormitories?: boolean;
}

export default function UniversalMap({ 
  singleDormitory,
  title = "Bản đồ ký túc xá tại Đà Nẵng",
  fetchAllDormitories = false
}: UniversalMapProps) {
  // State to store dormitories data
  const [dormitories, setDormitories] = useState<Building[]>(singleDormitory ? [singleDormitory] : []);
  const [isLoading, setIsLoading] = useState(fetchAllDormitories);
  const [error, setError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Da Nang city center
  const defaultLat = 16.047079;
  const defaultLng = 108.206230;
  
  // Fetch all dormitories if needed
  useEffect(() => {
    if (!fetchAllDormitories) return;

    async function fetchDormitories() {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/building`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch dormitories data');
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Process data based on API structure
        let dormsList: Building[] = [];
        
        if (data?.data?.data && Array.isArray(data.data.data)) {
          dormsList = data.data.data;
        } else if (data?.data?.items && Array.isArray(data.data.items)) {
          dormsList = data.data.items;
        } else if (data?.data && Array.isArray(data.data)) {
          dormsList = data.data;
        } else if (Array.isArray(data.data)) {
          dormsList = data.data;
        } else if (Array.isArray(data)) {
          dormsList = data;
        }
        
        console.log('Processed dormitories data:', dormsList);
        
        // Check if any dormitories have valid coordinates
        const dormsWithCoords = dormsList.filter(dorm => 
          dorm?.latitude && dorm?.longitude && 
          dorm.latitude !== 0 && dorm.longitude !== 0
        );
        
        console.log('Dormitories with valid coordinates:', dormsWithCoords);
        
        setDormitories(dormsList);
      } catch (error) {
        console.error('Error fetching dormitories:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchDormitories();
  }, [fetchAllDormitories]);
  
  // Get valid dormitories with coordinates
  const validDorms = dormitories.filter(dorm => 
    dorm?.latitude && dorm?.longitude && 
    dorm.latitude !== 0 && dorm.longitude !== 0
  );

  // Initialize map script for interactive markers
  useEffect(() => {
    // Skip if already loaded or no valid dormitories
    if (mapLoaded || isLoading || validDorms.length === 0) return;

    // Flag to check if script is already loaded
    const scriptLoaded = document.getElementById('leaflet-script');
    if (scriptLoaded) {
      initializeMap();
      return;
    }

    // Create and load Leaflet script
    const script = document.createElement('script');
    script.id = 'leaflet-script';
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    
    // Create and load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    
    document.head.appendChild(link);
    
    script.onload = initializeMap;
    document.body.appendChild(script);
  }, [dormitories, isLoading, validDorms, mapLoaded]);

  // Initialize the map with markers after script is loaded
  function initializeMap() {
    try {
      // If no valid dorms or still loading, don't initialize map
      if (validDorms.length === 0 || isLoading) return;
      
      // Make sure leaflet is available
      if (typeof window === 'undefined' || !window.L) return;
      
      const L = window.L;
      console.log('Initializing Leaflet map');

      // Remove existing map if any
      const existingMap = document.getElementById('map-container');
      if (existingMap) {
        while (existingMap.firstChild) {
          existingMap.removeChild(existingMap.firstChild);
        }
      }
      
      // Create map div
      const mapDiv = document.createElement('div');
      mapDiv.id = 'dormitory-map';
      mapDiv.style.height = '500px';
      mapDiv.style.width = '100%';
      mapDiv.style.borderRadius = '0.5rem';
      
      // Add to container
      if (existingMap) {
        existingMap.appendChild(mapDiv);
      }
      
      // Calculate center point
      let center: [number, number];
      let zoom: number;
      
      if (singleDormitory && validDorms.length === 1) {
        // For detail page
        center = [validDorms[0].latitude, validDorms[0].longitude];
        zoom = 17;
      } else {
        // For list page with multiple dormitories
        if (validDorms.length > 1) {
          // Calculate average of coordinates
          const sumLat = validDorms.reduce((sum, dorm) => sum + dorm.latitude, 0);
          const sumLng = validDorms.reduce((sum, dorm) => sum + dorm.longitude, 0);
          center = [sumLat / validDorms.length, sumLng / validDorms.length];
          zoom = 14;
        } else if (validDorms.length === 1) {
          center = [validDorms[0].latitude, validDorms[0].longitude];
          zoom = 15;
        } else {
          // Default to Da Nang center
          center = [defaultLat, defaultLng];
          zoom = 13;
        }
      }
      
      // Initialize map
      const map = L.map('dormitory-map').setView(center, zoom);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Add markers for all valid dormitories
      validDorms.forEach(dorm => {
        // Create marker
        const marker = L.marker([dorm.latitude, dorm.longitude]).addTo(map);
        
        // Add popup with dormitory info
        const popupContent = `
          <div style="text-align: center; padding: 5px;">
            <strong style="display: block; margin-bottom: 5px;">${dorm.name}</strong>
            <p style="margin: 5px 0; font-size: 0.875rem; color: #4B5563;">${dorm.address || 'Đà Nẵng'}</p>
            ${!singleDormitory ? `<a href="/dormitories/${dorm.id}" style="display: inline-block; margin-top: 8px; padding: 4px 10px; background-color: #3B82F6; color: white; border-radius: 4px; text-decoration: none; font-size: 0.875rem;">Xem chi tiết</a>` : ''}
          </div>
        `;
        
        // Create popup with options
        const popup = L.popup({
          closeButton: false,
          closeOnClick: false,
          autoClose: !singleDormitory, // Auto close for list view
          offset: L.point(0, -30)
        }).setContent(popupContent);
        
        // Connect popup to marker
        marker.bindPopup(popup);
        
        // For list view, show popup on hover
        if (!singleDormitory) {
          // Use arrow functions to avoid 'this' binding issues
          marker.on('mouseover', () => {
            marker.openPopup();
          });
          
          marker.on('mouseout', () => {
            marker.closePopup();
          });
          
          // Navigate to detail page on click
          marker.on('click', () => {
            window.location.href = `/dormitories/${dorm.id}`;
          });
        } else {
          // For detail view, show popup immediately and keep it open
          setTimeout(() => marker.openPopup(), 500);
        }
      });
      
      // Fit bounds if multiple markers
      if (validDorms.length > 1) {
        const bounds = L.latLngBounds(
          validDorms.map(dorm => L.latLng(dorm.latitude, dorm.longitude))
        );
        map.fitBounds(bounds);
      }
      
      setMapLoaded(true);
      
    } catch (e) {
      console.error('Error initializing map:', e);
      // Fallback to static map
      renderStaticMap();
    }
  }
  
  // Render static map as a fallback
  function renderStaticMap() {
    // Generate OpenStreetMap URL
    let mapUrl: string;
    
    if (validDorms.length === 0) {
      // Default Da Nang view
      mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${defaultLng-0.025},${defaultLat-0.025},${defaultLng+0.025},${defaultLat+0.025}&layer=mapnik`;
    } else if (singleDormitory && validDorms.length === 1) {
      // Detail view
      const dorm = validDorms[0];
      mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${dorm.longitude-0.005},${dorm.latitude-0.005},${dorm.longitude+0.005},${dorm.latitude+0.005}&marker=${dorm.latitude},${dorm.longitude}&layers=M`;
    } else {
      // List view with multiple dormitories
      // Calculate bounds
      const lats = validDorms.map(d => d.latitude);
      const lngs = validDorms.map(d => d.longitude);
      
      const minLat = Math.min(...lats) - 0.01;
      const maxLat = Math.max(...lats) + 0.01;
      const minLng = Math.min(...lngs) - 0.01;
      const maxLng = Math.max(...lngs) + 0.01;
      
      // Create URL
      mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLng},${minLat},${maxLng},${maxLat}&layer=mapnik`;
      
      // Add markers (up to 5 due to OSM limitations)
      if (validDorms.length > 0) {
        mapUrl += "&marker=";
        validDorms.slice(0, 5).forEach((dorm, index) => {
          if (index > 0) mapUrl += ",";
          mapUrl += `${dorm.latitude},${dorm.longitude}`;
        });
      }
    }
    
    // Return iframe element
    return (
      <iframe 
        src={mapUrl}
        width="100%" 
        height="100%" 
        frameBorder="0" 
        scrolling="no" 
        marginHeight={0} 
        marginWidth={0}
        title={`Bản đồ ký túc xá tại Đà Nẵng`}
        className="border-0"
      ></iframe>
    );
  }

  // Determine container class based on page type
  const containerClass = singleDormitory 
    ? "bg-white rounded-xl shadow-lg overflow-hidden mb-8" // Detail page
    : "mb-8"; // List page

  // Determine container padding and heading style based on page type
  const contentClass = singleDormitory
    ? "p-8 pb-4" // Detail page
    : ""; // List page

  return (
    <div className={containerClass}>
      <h2 className={`text-2xl font-bold text-gray-900 ${contentClass}`}>{title}</h2>
      <div className={singleDormitory ? "" : "bg-white rounded-lg shadow-md p-6"}>
        {isLoading ? (
          <div className="w-full h-[500px] flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="w-full h-[500px] flex items-center justify-center bg-gray-100">
            <div className="text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-gray-600">Không thể tải dữ liệu bản đồ. Vui lòng thử lại sau.</p>
            </div>
          </div>
        ) : (
          <div id="map-container" className="w-full h-[500px] rounded-lg overflow-hidden">
            {renderStaticMap()}
          </div>
        )}
        
        <div className={singleDormitory ? "p-8 pt-4" : ""}>
          <div className={singleDormitory ? "flex items-center text-gray-600" : "hidden"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1 1 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="font-medium">Địa chỉ:</span> <span className="ml-2">{singleDormitory?.address}</span>
          </div>
          
          {/* Different message for list and detail view */}
          <p className="text-gray-600 italic text-sm mt-4">
            {singleDormitory 
              ? (!singleDormitory.latitude || !singleDormitory.longitude) && "* Vị trí chỉ mang tính chất minh họa." 
              : "* Di chuột qua vị trí trên bản đồ để xem thông tin, bấm vào để chuyển đến trang chi tiết."
            }
          </p>
          
          {!singleDormitory && validDorms.length > 5 && (
            <p className="text-gray-600 italic text-sm mt-2">
              * Chỉ hiển thị 5 vị trí đầu tiên trên bản đồ. Xem trang chi tiết để biết vị trí chính xác của mỗi ký túc xá.
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 