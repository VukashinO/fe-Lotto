interface Player {
    username : string,
    firstName : string, 
    lastName : string,
    balance : number,
    role : any
}

interface ITicketPostModel {
    combination : string
}

interface IResponceTicketViewModel {
    id : number,
    round: number,
    combination : string,
    roundCombination:string,
    status : number,
    prize : number,
    dateCreated: Date
}

interface IRoundWinningCombination {
    round: number,
    winningCombination: string
}

interface ITicketValue {
    id: number,
    value: string
}

interface ICombinations {
    id: number,
    ticket: ITicketValue[]
}

interface IAuthorizeModel {
    id: number,
    userName: string
    token: string,
    isAdmin: boolean
}

interface ILogInViewModel {
    userName: string,
    password: string
}

interface IRegisterViewModel {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    confirmPassword: string
}

interface IRoundVIewModel {
    round: number,
    winningCombination: string,
    payIn: string,
    payOut: string,
    summary: string
}


interface IWinningCombination {
    round: number,
    WinningCombination: string
}