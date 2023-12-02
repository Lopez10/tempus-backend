import { RetrieveAreaUseCase } from '../../../../modules/area/application/UseCases/RetrieveArea/RetrieveArea.useCase';
import { MockAreaRepository } from '../../MockAreaRepository';
import { mockAreaData } from '../../mockAreaData';
import { AreaRepositoryPort } from '../../../../modules/area/domain/Area.repository.port';

describe('Retrieve Area Use Case', () => {
  it(`
        GIVEN an existing area
        WHEN the area is retrieved by id
        THEN the area should be returned
    `, async () => {
    const areaReposistory: AreaRepositoryPort = new MockAreaRepository();
    mockAreaData(areaReposistory);
    const action = new RetrieveAreaUseCase(areaReposistory);

    // GIVEN
    const areaRequestData = {
      id: 'Area_1',
    };

    // WHEN
    const areaRetrieved = await action.run(areaRequestData);

    // THEN
    expect(areaRetrieved.id).toEqual('Area_1');
  });
});
