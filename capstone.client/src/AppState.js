import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  loading: true,
  items: [],
  reviews: [],
  myReviews: [],
  location: null,
  requests: [],
  activeRequests: [],
  pendingRequests: [],
  pastRequests: [],
  messages: [],
  chats: [],
  activeItem: {},
  activeRequest: {},
  activeAccount: {}
})
