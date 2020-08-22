type HttpRequestParams = {
  [key: string]: string;
};

const encodeParam = (string: string): string => encodeURIComponent(string).replace(/[!'()*]/g, (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

const createQueryParams = (params: HttpRequestParams) => {
  return Object.keys(params).reduce((acc, val, idx) => {
    return `${acc}${idx === 0 ? '?' : '&'}${val}=${encodeParam(params[val])}`;
  }, '');
};

const handleResponse = async (response: Response) => {
  if (response.status < 200 || response.status >= 300) throw Error(response.statusText);

  const json = await response.json();
  return json;
};

export const get = async (url: string, options: RequestInit, params?: HttpRequestParams): Promise<any> => {
  let requestUrl = url;
  const requestOptions = {
    ...options,
    method: 'GET'
  };

  if (params) {
    requestUrl += createQueryParams(params);
  }

  const response = await fetch(requestUrl, requestOptions);
  return handleResponse(response);
};
