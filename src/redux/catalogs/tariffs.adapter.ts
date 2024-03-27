import { createEntityAdapter } from '@reduxjs/toolkit';

import { Tariff, TariffDto } from '.';

export const tariffsAdapter = createEntityAdapter({
    selectId: (tariff: Tariff) => tariff._id,
});

export const FREE_TARIFF_ID = 'FREE_TARIFF';

export const tariffsInitialState = tariffsAdapter.getInitialState(undefined, [
    {
        _id: FREE_TARIFF_ID,
        name: 'Free',
        cover: '/free-tariff-cover.png',
        periods: [],
    },
]);

const mapTariffDtos = (dtos: TariffDto[]) =>
    dtos.map(
        (dto): Tariff => ({
            ...dto,
            cover: `/${dto.name.toLowerCase()}-tariff-cover-disabled.png`,
        }),
    );

export const transformTariffsResponse = (tariffs: Tariff[]) =>
    tariffsAdapter.setMany(tariffsInitialState, mapTariffDtos(tariffs));
