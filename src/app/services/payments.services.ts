import axios from 'axios';
const environment = {
  mainBaseUrl: 'https://fp-client-api.asakashi.com/api/main',
  baseURL:'https://fp-client-api.asakashi.com/api',
  clientBaseUrl:'https://fp-client-api.asakashi.com/api/client'
};
export interface ITransactionRequest {
  nonce?: string | undefined;
  device_data?: any;
  destination_id: string | undefined;
  shipping_code: string | undefined;
  payment_method: string | undefined;
}
export interface ITransactionResponse {
  id: string;
  status: string;
  type: string;
  currencyIsoCode: string;
  amount: string;
  merchantAccountId: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
}
export interface IBraintreeToken {
  token: string;
}
export default class PaymentHttpClient {
  /**
   * Generate Token
   * @returns
   */
  public static generateToken(): Promise<IBraintreeToken> {
    // generate token
   return axios.get(environment.clientBaseUrl + '/checkout/braintree/token')

  }


  /**
   * Checkout Transaction
   * @param payload
   * @returns
   */
  public static async checkout(
    payload: ITransactionRequest
  ): Promise<any> {
    // checkout API
    const response = await axios.post(environment.clientBaseUrl + '/checkout', payload)
    return response;
   
  }


  public static paypalCheckout(data:any){
    return axios.post(environment.clientBaseUrl + '/checkout', data);
  }
  
  public static paypalSuccessload(data:any){
    return axios.post(environment.clientBaseUrl + '/checkout/paypal/success', data);
  }
  
  public static paypalFailedLoad(data:any){
    return axios.post(environment.clientBaseUrl + '/checkout/paypal/success', data);
  }

  sendUserExperience(data:any){
    return axios.post(environment.clientBaseUrl + '/checkout/save_experience', data);

  }

}