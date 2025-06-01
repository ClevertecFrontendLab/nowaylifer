import HTTPMethod from 'http-method-enum';

import { WithErrorLogMeta } from '~/shared/infra/error-logger';

import { UploadedFile } from '../common';
import { ApiEndpoint } from '../endpoints';
import { apiSlice } from '../query';

export const fileApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        uploadFile: build.mutation<UploadedFile, WithErrorLogMeta<{ file: File }>>({
            query: ({ file, ...errorLogMeta }) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: ApiEndpoint.UPLOAD_FILE,
                    method: HTTPMethod.POST,
                    body: formData,
                    errorLogMeta,
                };
            },
        }),
    }),
});
