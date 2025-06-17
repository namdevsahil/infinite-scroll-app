import { useEffect, useRef, useState, useCallback } from "react";
import { fetchPhotos } from "../services/api";
import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage"; // ✅ keep this
// ❌ REMOVE the line below completely
// import SearchBar from "../components/SearchBar"; ❌

const Home = ({ searchQuery }) => {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observer = useRef();

  const lastItemRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchPhotos(page);
      console.log("Fetched data:", data); // ✅ Debug line
      setItems((prev) => [...prev, ...data]);
    } catch {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Call loadData when page changes
  useEffect(() => {
    loadData();
  }, [page]);

  // ✅ Filter items when search query or data changes
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setDisplayedItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedItems(filtered);
    }
  }, [searchQuery, items]);

  return (
    <>
      <div className="container">
        {displayedItems.map((item, index) => {
          if (index === displayedItems.length - 1) {
            return (
              <div ref={lastItemRef} key={item.id}>
                <ItemCard item={item} />
              </div>
            );
          }
          return <ItemCard key={item.id} item={item} />;
        })}
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && displayedItems.length === 0 && (
        <p className="empty">😕 No items match your search.</p>
      )}
    </>
  );
};

export default Home;
