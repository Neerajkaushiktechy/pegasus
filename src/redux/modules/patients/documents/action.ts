
import {
    FETCH_PROVIDERNAMES_REQUEST,
    FETCH_PROVIDERNAMES_SUCCESS,
    FETCH_PROVIDERNAMES_FALIURE,
    FETCH_DOCUMENTTYPE_REQUEST,
    FETCH_DOCUMENTTYPE_SUCCESS,
    FETCH_DOCUMENTTYPE_FALIURE,
    GET_DOCUMENT_REQUEST,
    GET_DOCUMENT_SUCCESS,
    GET_DOCUMENT_FALIURE,
    POST_DOCUMENT_REQUEST,
    POST_DOCUMENT_SUCCESS,
    POST_DOCUMENT_FALIURE,
    DELETE_DOCUMENT_REQUEST,
    DELETE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_FALIURE,
    UPDATE_DOCUMENT_REQUEST,
    UPDATE_DOCUMENT_SUCCESS,
    UPDATE_DOCUMENT_FALIURE,
    DOWNLOAD_DOCUMENT_REQUEST,
    DOWNLOAD_DOCUMENT_SUCCESS,
    DOWNLOAD_DOCUMENT_FALIURE
} from "./actionTypes";
import {
    FetchProviderDataRequest,
     FetchProviderDataSuccess,
    FetchProviderDataFailure,
     FetchDocumentTypesRequest,
     FetchDocumentTypesSuccess,
     FetchDocumentTypesFailure,
     FetchDocumentDataRequest,
     FetchDocumentDataSuccess,
     FetchDocumentDataFailure,
     PostDocumentDataRequest,
     PostDocumentDataSuccess,
     PostDocumentDataFailure,
     DeleteDocumentRequest,
    DeleteDocumentSuccess,
    DeleteDocumentFailure,
     UpdateDocumentRequest,
     UpdateDocumentSuccess,
     UpdateDocumentFailure,
     DownloadDocumentRequest,
     DownloadDocumentSuccess,
     DownloadDocumentFailure
} from "./types";


//GET Provider 
export const fetchProviderDataRequest = (): FetchProviderDataRequest => ({
    type: FETCH_PROVIDERNAMES_REQUEST
});

export const fetchProviderDataSuccess = (payload: any): FetchProviderDataSuccess => ({
    type: FETCH_PROVIDERNAMES_SUCCESS,
    payload
});

export const fetchProviderDataFailure = (payload: string): FetchProviderDataFailure => ({
    type: FETCH_PROVIDERNAMES_FALIURE,
    payload
})

//GET Document Type
export const fetchDocumentTypesRequest = (): FetchDocumentTypesRequest => ({
    type: FETCH_DOCUMENTTYPE_REQUEST,
});

export const fetchDocumentTypesSuccess = (payload: any): FetchDocumentTypesSuccess => ({
    type: FETCH_DOCUMENTTYPE_SUCCESS,
    payload
});

export const fetchDocumentTypesFailure = (payload: string): FetchDocumentTypesFailure => ({
    type: FETCH_DOCUMENTTYPE_FALIURE,
    payload
})

// GET Document
export const fetchDocumentDataRequest = (payload: string): FetchDocumentDataRequest => ({
    type: GET_DOCUMENT_REQUEST,
    payload
});

export const fetchDocumentDataSuccess = (payload: any): FetchDocumentDataSuccess => ({
    type: GET_DOCUMENT_SUCCESS,
    payload
});

export const fetchDocumentDataFailure = (payload: string): FetchDocumentDataFailure => ({
    type: GET_DOCUMENT_FALIURE,
    payload
})

// POST Document 
export const postDocumentRequest = (payload: any): PostDocumentDataRequest => ({
    type: POST_DOCUMENT_REQUEST,
    payload
});

export const postDocumentSuccess = (payload: any): PostDocumentDataSuccess => {
    return {
        type: POST_DOCUMENT_SUCCESS,
        payload
    }
};

export const postDocumentFaliure = (payload: string): PostDocumentDataFailure => ({
    type: POST_DOCUMENT_FALIURE,
    payload
})

// Delete Document
export const deleteDocumentRequest = (payload: string): DeleteDocumentRequest => ({
    type: DELETE_DOCUMENT_REQUEST,
    payload
});

export const deleteDocumentSuccess = (payload: any): DeleteDocumentSuccess => ({
    type: DELETE_DOCUMENT_SUCCESS,
    payload
});

export const deleteDocumentFailure = (payload: string): DeleteDocumentFailure => ({
    type: DELETE_DOCUMENT_FALIURE,
    payload
})

// update Document
export const updateDocumentRequest = (payload: any): UpdateDocumentRequest => ({
    type: UPDATE_DOCUMENT_REQUEST,
    payload
});

export const updateDocumentSuccess = (payload: any): UpdateDocumentSuccess => ({
    type: UPDATE_DOCUMENT_SUCCESS,
    payload
});

export const updateDocumentFailure = (payload: string): UpdateDocumentFailure => ({
    type: UPDATE_DOCUMENT_FALIURE,
    payload
})

//Download Document
export const downloadDocumentRequest = (payload: any): DownloadDocumentRequest => ({
    type: DOWNLOAD_DOCUMENT_REQUEST,
    payload
});

export const downloadDocumentSuccess = (payload: any): DownloadDocumentSuccess => ({
    type: DOWNLOAD_DOCUMENT_SUCCESS,
    payload
});

export const downloadDocumentFailure = (payload: string): DownloadDocumentFailure => ({
    type: DOWNLOAD_DOCUMENT_FALIURE,
    payload
})
