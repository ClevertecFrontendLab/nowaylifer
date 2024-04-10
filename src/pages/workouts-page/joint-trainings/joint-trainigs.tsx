import { Fragment } from 'react';
import { AppLoader } from '@components/app-loader';
import { faker } from '@faker-js/faker';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
  selectMostPopularTrainingType,
  useLazyFetchUserJointTrainingListQuery,
  UserJointTraining,
} from '@redux/catalogs';

import { UsersJointTrainingScreen } from './users-joint-training-screen';

const data: UserJointTraining[] = new Array(40)
  .fill(null)
  .map(() => ({
    id: '12',
    avgWeightInWeek: 156,
    imageSrc: null,
    name: faker.person.fullName(),
    trainingType: 'Руки',
    status: null,
    inviteId: null,
  }));

export const JointTrainings = () => {
  const [fetchUserJointTrainingList, { isFetching }] = useLazyFetchUserJointTrainingListQuery();
  const mostPopularTrainingType = useAppSelector(selectMostPopularTrainingType);

  return (
    <Fragment>
      <AppLoader open={isFetching} />
      {/* <SelectPartnerCard
                onRandomSelect={() => fetchUserJointTrainingList()}
                onSelect={() => fetchUserJointTrainingList(mostPopularTrainingType)}
            /> */}
      <UsersJointTrainingScreen users={data} />
    </Fragment>
  );
};
