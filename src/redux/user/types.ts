export type User = {
    email: string;
    firstName?: string;
    lastName?: string;
    birthday?: string; // ISO Date string;
    imgSrc?: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff?: {
        tariffId: string;
        expired: string; // ISO Date string;
    };
};

export type EditUserDTO = Omit<User, 'tariff'> & {
    password?: string;
};
