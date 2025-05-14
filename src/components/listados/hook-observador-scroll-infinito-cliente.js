import { useState, useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll(fetchItems) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  const itemIds = useRef(new Set()); // evitar duplicados

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const { newItems, moreAvailable } = await fetchItems(page);

    const filteredItems = newItems.filter(item => {
      if (itemIds.current.has(item.id)) return false;
      itemIds.current.add(item.id);
      return true;
    });

    setItems(prev => [...prev, ...filteredItems]);
    setPage(prev => prev + 1);
    setHasMore(moreAvailable);
    setLoading(false);
  }, [page, loading, hasMore, fetchItems]);

  useEffect(() => {
    loadMore();
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
