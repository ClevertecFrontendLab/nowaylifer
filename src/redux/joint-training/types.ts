import { Training } from '@redux/training';

export type SendInviteDto = {
    to: string; // user id;
    trainingId: string;
};

export type TrainingParticipant = {
    _id: string;
    firstName: string | null;
    lastName: string | null;
    imageSrc: string | null;
};

export type TrainingInvite = {
    _id: string;
    from: TrainingParticipant;
    to: TrainingParticipant;
    training: Training;
    status: 'accepted' | 'rejected';
    createdAt: string;
};

export type TrainingInviteForMe = Omit<TrainingInvite, 'to'>;
