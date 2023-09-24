import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://localhost:7235/api/";
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  data: any;
  UserInfo: any;

  jwtHelperService = new JwtHelperService();

  registerUser(account: Array<any>){
    return this.http.post(this.baseUrl + "Register/RegisterAccount", {
      FullName: account[0],
      FathersName: account[1],
      MobileNumber : account[2],
      Email: account[3],
      AadharNumber: account[4],
      DOB: account[5],
      RAddress: account[6],
      PAddress: account[7],
      RState: account[8],
      PState: account[9],
      RCity: account[10],
      PCity: account[11],
      RPincode: account[12],
      PPincode: account[13],
      OccupationType: account[14],
      Income: account[15],
      AnnualIncome: account[16]
    },
    {
      responseType: 'text',
    });
  }

  registerInternetBanking(user: Array<any>){
    return this.http.post(this.baseUrl + "Register/RegisterInternetBanking", {
      AccountNumber:user[0],
      Email: user[1],
      Password: user[2]
    }, {responseType:'text',});
  }

  loginUser(loginInfo: Array<any>){
    return this.http.post(this.baseUrl + "Register/Login", {
      Email: loginInfo[0],
      Password: loginInfo[1],
    }, {responseType:'text',})
  }

  AddUser(loginInfo: Array<any>){
    return this.http.post(this.baseUrl + "Register/AddBenificary", {
      name: loginInfo[0],
      accountNumber: loginInfo[1],
    }, {responseType:'text',})
  }

  payment(user: Array<any>){
    return this.http.post(this.baseUrl + "Register/transaction", {
      transactionType: user[0],
      fromAccount: user[1],
      toAccount: user[2],
      amount: user[3],
      transactionDate: user[4],
      remark: user[5],
    }, {responseType:'text',})
  }

  changePassword(user: Array<any>){
    return this.http.post(this.baseUrl + "Register/changepassword", {
      oldPassword: user[0],
      newPassword: user[1],
      email:user[2],
    }, {responseType:'text',})
  }

  setToken(token:string){
    localStorage.setItem("access_token", token);
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
    this.data = userInfo ? {
      UserEmail: userInfo.email,
      UserAccountNumber: userInfo.acnumber
    } : null;
    this.currentUser.next(this.data);

    console.log(this.data);
  }

  isloggedIn(): boolean{
    return localStorage.getItem("access_token") ? true : false
  }

  removeToken(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("LoginEmail");
    //localStorage.removeItem("UserAccount");
  }

  getAccountDetails(userEmail: any){
    return this.http.get(this.baseUrl + "Register/GetAccount/" + userEmail, {responseType:'json',})
  }

  getInterBank(userEmail: any){
    return this.http.get(this.baseUrl + "Register/GetInternetBanking/" + userEmail, {responseType: 'json',})
  }

  getPayments(userAccount: any){
    return this.http.get(this.baseUrl + "Register/GetTransaction/" + userAccount, {responseType: 'json',})
  }
}
