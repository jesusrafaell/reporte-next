export interface FlagInt {
	[key: string]: boolean;
}

export interface errorFlagInt {
	email: boolean;
	password: FlagInt;
	identType: boolean;
	identNum: boolean;
}

export interface UserInt {
	email: string;
	password: string;
	identTypeId: number;
	identNum: string;
}
