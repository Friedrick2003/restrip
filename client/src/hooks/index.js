import { useState, useEffect, useCallback } from "react";
import { hotelsAPI, roomsAPI, bookingsAPI } from "../api";

// ── Generic fetch hook ────────────────────────────────────────────
export function useFetch(fetchFn, deps = []) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => { execute(); }, [execute]);
  return { data, loading, error, refetch: execute };
}

// ── Hotels ────────────────────────────────────────────────────────
export function useHotels(params = {}) {
  const key = JSON.stringify(params);
  return useFetch(() => hotelsAPI.getAll(params), [key]);
}

export function useHotel(id) {
  return useFetch(() => hotelsAPI.getById(id), [id]);
}

// ── Rooms ─────────────────────────────────────────────────────────
export function useRooms(hotelId, checkIn, checkOut) {
  return useFetch(
    () => roomsAPI.getByHotel(hotelId, checkIn, checkOut),
    [hotelId, checkIn, checkOut]
  );
}

// ── My bookings ───────────────────────────────────────────────────
export function useMyBookings() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await bookingsAPI.getMyBookings();
      setData(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const cancel = async (id, reason) => {
    await bookingsAPI.cancel(id, reason);
    await fetch();
  };

  return { data, loading, error, refetch: fetch, cancel };
}

// ── All bookings (admin) ──────────────────────────────────────────
export function useAllBookings(params = {}) {
  const key = JSON.stringify(params);
  return useFetch(() => bookingsAPI.getAll(params), [key]);
}
