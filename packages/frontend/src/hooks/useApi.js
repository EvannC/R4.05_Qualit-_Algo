<<<<<<< HEAD
import { useState, useCallback } from 'react'
import axios from 'axios'

export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (config) => {
    const token = localStorage.getItem('token')

    try {
      setLoading(true)
      setError(null)
=======
import axios from 'axios';
import { useCallback, useState } from 'react';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    const token = localStorage.getItem('token');

    try {
      setLoading(true);
      setError(null);
>>>>>>> 2b808a8 (chore: initial project setup)

      const response = await axios({
        ...config,
        headers: {
          ...config.headers,
<<<<<<< HEAD
          Authorization: token ? `Bearer ${token}` : undefined
        }
      })

      return response.data
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const get = (url) => request({ method: 'GET', url })
  const post = (url, data) => request({ method: 'POST', url, data })
  const put = (url, data) => request({ method: 'PUT', url, data })
  const del = (url) => request({ method: 'DELETE', url })
=======
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = (url) => request({ method: 'GET', url });
  const post = (url, data) => request({ method: 'POST', url, data });
  const put = (url, data) => request({ method: 'PUT', url, data });
  const del = (url) => request({ method: 'DELETE', url });
>>>>>>> 2b808a8 (chore: initial project setup)

  return {
    loading,
    error,
    request,
    get,
    post,
    put,
<<<<<<< HEAD
    delete: del
  }
}
=======
    delete: del,
  };
};
>>>>>>> 2b808a8 (chore: initial project setup)
