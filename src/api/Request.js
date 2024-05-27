import * as req from './Http';

export const PostReq = async (path, body) => {
  /**request for post method */
  try {
    const response = await req.http.post(path, body);
    if(response?.status === 200 || response?.status === 201){
      return response
    }
    else
      return response?.response;
  } catch (err) {
    console.error(err)
  }
};

export const PostReqtoken = async (path, body) => {
  /**request for post method */
  try {
    const response = await req.http.post(path, body);
    if(response?.status === 200 || response?.status === 201)
      return response
    else
      return response?.response;
  } catch (err) {}
};
export const getReqtoken = (path, body) => {
  /**request for post method */
    return req.http.get(path, body).then((res) => {
      return res;
    })
    .catch((err) => {return err})
};
export const PostReqMultiPart = async (path, body) => {
  /**request for post method */
  try {
    const response = await req.httpMultipart.post(path, body);
    return response;
  } catch (err) {}
};

export const PutReqMultiPart = async (path, body) => {
  /**request for post method */
  try {
    const response = await req.httpMultipart.put(path, body);
    return response;
  } catch (err) {}
};

export const getReq = async path => {
  /**request for get method */
  return await req.http
    .get(path)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
};
export const putRequesttoken = async (path, body) => {
  /**request for put method */
  return await req.http
    .put(path, body)
    .then(response => {
      return response;
    })
    .catch(err => {});
};
export const putReq = async (path, body) => {
  /**request for put method  for multipart*/
  return await req.httpMultipart
    .put(path, body)
    .then(response => {
      return response;
    })
    .catch(err => {});
};

export const putRequest = async (path, body) => {
  /**request for put method */
  return await req.http
    .put(path, body)
    .then(response => {
      return response;
    })
    .catch(err => {});
};

export const delReq = async (path, body) => {
  /**request for delete method */
  return await req.http
    .delete(path, body)
    .then(response => {
      return response;
    })
    .catch(err => {});
};

export const PatchReqtoken = async (path, body) => {
  /**request for post method */
  try {
    const response = await req.http.patch(path, body);
    if(response?.status === 200 || response?.status === 201)
      return response
    else
      return response?.response;
  } catch (err) {}
};

export const PatchReqMultiparttoken = async (path, body) => {
  /**request for post method */
  try {
    const response = await req.httpMultipart.patch(path, body);
    if(response?.status === 200 || response?.status === 201)
      return response
    else
      return response?.response;
  } catch (err) {}
};
