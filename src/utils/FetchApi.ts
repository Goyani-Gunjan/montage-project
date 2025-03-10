/* eslint-disable no-undef */

interface ApiResponse<T = unknown> {
  success: boolean;
  internet?: boolean;
  message?: string;
  data?: T;
}

interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers: Record<string, string>;
  body?: string | null;
}

/**
 * Generic GET request to a specific route with Authorization header
 * @template T - The expected response data type
 * @param pathName - Path after main server URL
 * @param token - Authentication token (optional)
 * @param method - HTTP method (defaults to "GET")
 * @returns Promise containing the API response
 */
export const fetchGet = async <T = unknown>(
  pathName: string,
  token: string | null,
  method: "GET" | "PUT" | "DELETE" = "GET"
): Promise<ApiResponse<T>> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  if (!navigator.onLine) {
    return { success: false, internet: true, message: "Connection Issue" };
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestOptions = {
    method,
    headers,
  };

  try {
    const request = await fetch(`${BASE_URL}${pathName}`, options);

    if (!request.ok) {
      const errorResponse = await request.json();
      return {
        success: false,
        message: errorResponse?.message || "Error occurred",
      };
    }

    const response = await request.json();
    return {
      success: true,
      data: response as T,
    };
  } catch (error) {
    console.error("Fetch GET error:", error);
    return { success: false, internet: true, message: "Connection Issue" };
  }
};

/**
 *
 * Generic POST request to a specific route with Authorization header
 * @template T - The expected response data type
 * @param pathName - Path after main server URL
 * @param token - Authentication token (optional)
 * @param body - JSON string body (optional)
 * @param method - HTTP method (defaults to "POST")
 * @param contentType - Content type header (defaults to "application/json")
 * @returns Promise containing the API response
 */
export const fetchPost = async <T = unknown>(
  pathName: string,
  token = null,
  body: string | null = null,
  method: "POST" | "PUT" | "PATCH" = "POST",
  contentType: string = "application/json"
): Promise<ApiResponse<T>> => {
  const BASE_URL = import.meta.env.BASE_URL;

  if (!navigator.onLine) {
    return { success: false, internet: true, message: "Connection Issue" };
  }

  const headers: Record<string, string> = {
    "Content-Type": contentType,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestOptions = {
    method,
    headers,
    body,
  };

  try {
    const request = await fetch(`${BASE_URL}${pathName}`, options);

    if (!request.ok) {
      const errorResponse = await request.json();
      return {
        success: false,
        message: errorResponse?.message || "Error occurred",
      };
    }

    const response = await request.json();
    return {
      success: true,
      data: response as T,
    };
  } catch (error) {
    console.error("Fetch POST error:", error);
    return { success: false, internet: true, message: "Connection Issue" };
  }
};
