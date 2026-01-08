'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// Dynamically import Excalidraw with SSR disabled - this is CRITICAL for Next.js
const Excalidraw = dynamic(
  async () => {
    const mod = await import("@excalidraw/excalidraw");
    return mod.Excalidraw;
  },
  {
    ssr: false,
    loading: () => (
      <div className="notes-canvas-loading">
        <div className="loading-spinner"></div>
        <p>Loading canvas...</p>
      </div>
    ),
  }
);

const ExcalidrawCanvas = ({ noteId }) => {
  const [mounted, setMounted] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const wrapperRef = useRef(null);
  const saveTimeout = useRef(null);
  const excalidrawRef = useRef(null);

  /* mount safety - ensure we're on client */
  useEffect(() => {
    setMounted(true);
    return () => {
      // Cleanup save timeout on unmount
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, []);

  /* resize fix for Excalidraw */
  useEffect(() => {
    if (!mounted) return;

    const fireResize = () => {
      window.dispatchEvent(new Event("resize"));
    };

    // Fire resize events to help Excalidraw calculate dimensions
    fireResize();
    const t1 = setTimeout(fireResize, 100);
    const t2 = setTimeout(fireResize, 300);
    const t3 = setTimeout(fireResize, 500);

    // Watch for container size changes
    const ro = new ResizeObserver(() => {
      fireResize();
    });

    if (wrapperRef.current) {
      ro.observe(wrapperRef.current);
    }

    return () => {
      ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [mounted]);

  /* load from DB (or fallback to localStorage) */
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      // If no noteId or Supabase not configured, use localStorage
      if (!noteId || !isSupabaseConfigured()) {
        try {
          const local = localStorage.getItem("excalidraw-data");
          if (local) {
            const parsed = JSON.parse(local);
            setInitialData(parsed);
          }
        } catch (e) {
          console.warn("Failed to load local excalidraw data:", e);
        }
        setIsLoading(false);
        return;
      }

      // Load from Supabase
      try {
        const { data, error } = await supabase
          .from("excalidraw_notes")
          .select("*")
          .eq("id", noteId)
          .single();

        if (error) {
          console.error("Error loading note:", error);
        } else if (data) {
          setInitialData({
            elements: data.elements || [],
            appState: data.app_state || {},
            files: data.files || {}
          });
        }
      } catch (e) {
        console.error("Failed to load from Supabase:", e);
      }

      setIsLoading(false);
    };

    loadData();
  }, [noteId]);

  /* save to localStorage + DB */
  const handleChange = useCallback((elements, appState, files) => {
    // Create minimal payload
    const payload = {
      elements: elements || [],
      appState: { 
        viewBackgroundColor: appState?.viewBackgroundColor || "#ffffff"
      },
      files: files || {}
    };

    // Always save to localStorage as backup
    try {
      localStorage.setItem("excalidraw-data", JSON.stringify(payload));
    } catch (e) {
      console.warn("Failed to save to localStorage:", e);
    }

    // Skip DB save if no noteId or Supabase not configured
    if (!noteId || !isSupabaseConfigured()) return;

    // Debounced save to Supabase
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(async () => {
      try {
        const { error } = await supabase
          .from("excalidraw_notes")
          .update({
            elements: payload.elements,
            app_state: payload.appState,
            files: payload.files,
            updated_at: new Date().toISOString()
          })
          .eq("id", noteId);

        if (error) {
          console.error("Error saving note:", error);
        }
      } catch (e) {
        console.error("Failed to save to Supabase:", e);
      }
    }, 1000); // 1 second debounce
  }, [noteId]);

  // Don't render anything on server
  if (!mounted) {
    return (
      <div className="notes-canvas-loading">
        <div className="loading-spinner"></div>
        <p>Initializing...</p>
      </div>
    );
  }

  // Show loading while fetching data
  if (isLoading) {
    return (
      <div className="notes-canvas-loading">
        <div className="loading-spinner"></div>
        <p>Loading your drawings...</p>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="excalidraw-wrapper">
      <Excalidraw
        ref={excalidrawRef}
        initialData={initialData}
        onChange={handleChange}
        UIOptions={{
          canvasActions: {
            loadScene: true,
            saveToActiveFile: false,
            toggleTheme: true,
          },
        }}
        theme="dark"
      />
    </div>
  );
};

export default ExcalidrawCanvas;
