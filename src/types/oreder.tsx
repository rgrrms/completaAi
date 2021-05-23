interface IAddress {
  city: string,
  complement: string,
  number: number
  state: string,
  street: string,
  zipCode: string,
  _id: string,
}

interface ICar {
  _id: string,
  license: string,
  carModel: string,
  color: string
}

export interface IServices {
  _id: string,
  amountFuel: string,
  fuelType: string
  idCar: string
  idUser: string
  payment: string
  paymentAccept: boolean
  service: string
  status: string
  address: IAddress,
  car: ICar
}
