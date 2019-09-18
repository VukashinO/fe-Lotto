import { HttpClient} from 'aurelia-http-client';
import {inject } from 'aurelia-framework';
import * as EndPoints from '../api-end-points/apiEndPoints';

@inject( HttpClient )
export class ApiService {
    constructor(private http : HttpClient, public isAuth: boolean, public isAdmin:boolean) {}

    public getTokken() {
      return  this.http.configure(x => {
            x.withBaseUrl(EndPoints.baseUrl);
            x.withHeader('Authorization', `bearer ${localStorage.getItem('authToken')}`);
        })
    }

    public register(register: IRegisterViewModel) {
        return jsonResponse<IAuthorizeModel>( this.http.post(`${EndPoints.baseUrl}${EndPoints.register}`, register) );
    }
    
    public logIn(logIn: ILogInViewModel) {
        return jsonResponse<IAuthorizeModel>( this.http.post(`${EndPoints.baseUrl}${EndPoints.logIn}`, logIn) );
    }

    public createTicket (post : ITicketPostModel)  {
       return jsonResponse<any>( this.getTokken().post( EndPoints.createTicket, post ));
    }

    public getTicketsByUserId() {
        return jsonResponse<IResponceTicketViewModel[]> (this.getTokken().get(EndPoints.getTicketsByUserId)); 
    }

    public getRoundWinningCombination() {
        return jsonResponse<IRoundWinningCombination> (this.getTokken().get(EndPoints.getRoundWinningCombination));
    }

    public getTicketsByRoundId(round: number) {
        return jsonResponse<IResponceTicketViewModel[]>( this.getTokken().get(`${EndPoints.baseUrl}${EndPoints.getTicketsByRoundId}${round}`) );
    }

    public generateRound() {
        return jsonResponse<void>( this.getTokken().put(`${EndPoints.baseUrl}${EndPoints.generateRound}`, null) );
    }
    
    public getResultsByRound() {
        return jsonResponse<IRoundVIewModel[]>( this.getTokken().get(`${EndPoints.baseUrl}${EndPoints.getResultsByRound}`) );
    }

    public checkIfAdmin() {
        return jsonResponse<void>( this.getTokken().get(`${EndPoints.baseUrl}${EndPoints.isAdmin}`) );
    }

    public getWinningCombinationByRoundId(round: number) {
        return jsonResponse<IWinningCombination>( this.getTokken().get(`${EndPoints.baseUrl}${EndPoints.getWinningCombination}${round}`) );
    }
}

export function jsonResponse<T>(promise: Promise<any>)  {
    return new Promise<T>((resolve, reject) => {
        promise.then((data) => {
            if (data.statusCode === 200) {
                if (data.response === '') {
                    resolve(undefined);
                } else {
                    resolve(JSON.parse(data.response));
                }
            }
            else if (data.statusCode === 409) {
                let exception = JSON.parse(data.response);

                if (!!exception) {
                    if (!!exception.errorMessages) {
                        reject(exception.errorMessages);
                    }
                } else {
                    reject(data.statusText);
                }
            }
            else {
                reject(data.statusText);
            }
        });
    });
}

