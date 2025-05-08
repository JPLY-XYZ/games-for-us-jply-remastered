import { useState, useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll(fetchItems) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null); // para el div en pantalla
  const observerRef = useRef(null); // para el observer

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const { newItems, moreAvailable } = await fetchItems(page);
    setItems(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
    setHasMore(moreAvailable);
    setLoading(false);
  }, [page, loading, hasMore, fetchItems]);

  useEffect(() => {
    loadMore(); // cargar la primera página al montar
  }, []);

  useEffect(() => {
    if (!loaderRef.current) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMore();
      }
    });

    observerRef.current.observe(loaderRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadMore, hasMore, loading]);

  return { items, loading, hasMore, loaderRef };
}
