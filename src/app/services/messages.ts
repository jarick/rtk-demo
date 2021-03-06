import { baseApi as api } from "../../store/baseApi";
import { Message } from "../../store/contracts";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query<GetMessagesApiResponse, GetMessagesApiArg>({
      query: (queryArg) => ({
        url: `/messages`,
        params: { chatId: queryArg.chatId, _expand: queryArg._expand },
      }),
      providesTags: ['Messages'],
    }),
    addMessage: build.mutation<AddMessageApiResponse, AddMessageApiArg>({
      query: (queryArg) => ({ url: `/messages`, method: 'POST', body: queryArg.message }),
      invalidatesTags: ['Messages'],
    }),
    getMessage: build.query<GetMessageApiResponse, GetMessageApiArg>({
      query: (queryArg) => ({ url: `/messages/${queryArg.id}` }),
      providesTags: ['Messages'],
    }),
    changeMessage: build.mutation<
      ChangeMessageApiResponse,
      ChangeMessageApiArg
    >({
      query: (queryArg) => ({
        url: `/messages/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.message
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
  overrideExisting: false,
});

export { injectedRtkApi as messagesApi };
export type GetMessagesApiResponse =
  /** status 200 successful operation */ Message[];
export type GetMessagesApiArg = {
  chatId?: number;
  _expand?: ('user' | 'chat')[];
};
export type AddMessageApiResponse =
  /** status 200 successful operation */ Message;
export type AddMessageApiArg = {
  message: Message;
};
export type GetMessageApiResponse =
  /** status 200 successful operation */ Message;
export type GetMessageApiArg = {
  id: number;
};
export type ChangeMessageApiResponse =
  /** status 200 successful operation */ Message;
export type ChangeMessageApiArg = {
  /** ID of chat */
  id: number;
  message: Message;
};
export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useGetMessageQuery,
  useChangeMessageMutation,
} = injectedRtkApi;
