
// import { familyFormData } from "../../../../pages/Patient/FamilyHistory/components/FamilyHistoryForm";
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
} from "./actionTypes"

//GET Provider Names

export interface FetchProviderDataRequest {
    type: typeof FETCH_PROVIDERNAMES_REQUEST;
}
export interface FetchProviderDataSuccess {
    type: typeof FETCH_PROVIDERNAMES_SUCCESS;
    payload: any;
}
export interface FetchProviderDataFailure {
    type: typeof FETCH_PROVIDERNAMES_FALIURE;
    payload: string;
}

//GET Document Types

export interface FetchDocumentTypesRequest {
    type: typeof FETCH_DOCUMENTTYPE_REQUEST;
}
export interface FetchDocumentTypesSuccess {
    type: typeof FETCH_DOCUMENTTYPE_SUCCESS;
    payload: any;
}
export interface FetchDocumentTypesFailure {
    type: typeof FETCH_DOCUMENTTYPE_FALIURE;
    payload: string;
}


// GET Document 
export interface FetchDocumentDataRequest {
    type: typeof GET_DOCUMENT_REQUEST;
    payload: string;
}
export interface FetchDocumentDataSuccess {
    type: typeof GET_DOCUMENT_SUCCESS;
    payload: any;
}
export interface FetchDocumentDataFailure {
    type: typeof GET_DOCUMENT_FALIURE;
    payload: string;
}

// POST Document
export interface PostDocumentDataRequest {
    type: typeof POST_DOCUMENT_REQUEST;
    payload: any
}
export interface PostDocumentDataSuccess {
    type: typeof POST_DOCUMENT_SUCCESS;
    payload: any;
}
export interface PostDocumentDataFailure {
    type: typeof POST_DOCUMENT_FALIURE;
    payload: string;
}

// DELETE Family History
export interface DeleteDocumentRequest {
    type: typeof DELETE_DOCUMENT_REQUEST,
    payload: string;
}
export interface DeleteDocumentSuccess {
    type: typeof DELETE_DOCUMENT_SUCCESS;
    payload: any;
}
export interface DeleteDocumentFailure {
    type: typeof DELETE_DOCUMENT_FALIURE;
    payload: string;
}

// UPDATE Documents
export interface UpdateDocumentRequest {
    type: typeof UPDATE_DOCUMENT_REQUEST,
    payload: any;
}
export interface UpdateDocumentSuccess {
    type: typeof UPDATE_DOCUMENT_SUCCESS;
    payload: any;
}
export interface UpdateDocumentFailure {
    type: typeof UPDATE_DOCUMENT_FALIURE;
    payload: string;
}

//Download Document
export interface DownloadDocumentRequest {
    type: typeof DOWNLOAD_DOCUMENT_REQUEST,
    payload: any;
}
export interface DownloadDocumentSuccess {
    type: typeof DOWNLOAD_DOCUMENT_SUCCESS;
    payload: any;
}
export interface DownloadDocumentFailure {
    type: typeof DOWNLOAD_DOCUMENT_FALIURE;
    payload: string;
}

export type AuthActions =
    | FetchProviderDataRequest
    | FetchProviderDataSuccess
    | FetchProviderDataFailure
    | FetchDocumentTypesRequest
    | FetchDocumentTypesSuccess
    | FetchDocumentTypesFailure
    | FetchDocumentDataRequest
    | FetchDocumentDataSuccess
    | FetchDocumentDataFailure
    | PostDocumentDataRequest
    | PostDocumentDataSuccess
    | PostDocumentDataFailure
    | DeleteDocumentRequest
    | DeleteDocumentSuccess
    | DeleteDocumentFailure
    | UpdateDocumentRequest
    | UpdateDocumentSuccess
    | UpdateDocumentFailure
    | DownloadDocumentRequest
    | DownloadDocumentSuccess
    | DownloadDocumentFailure