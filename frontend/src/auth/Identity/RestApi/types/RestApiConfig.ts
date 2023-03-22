import Requester from './MakeRequester'
import UseAuthState from './UseAuthState'

export default interface RestApiConfig {
  makeRequester: Requester
  useAuthState: UseAuthState
}
