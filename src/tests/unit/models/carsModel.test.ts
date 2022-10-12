import { expect } from 'chai';
import sinon from 'sinon';
import CarsModel from '../../../models/carsModel';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carsMock';

describe('Frame Model', () => {
	const mongoModel = new CarsModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
	});

  after(() => {
		sinon.restore();
	});

	describe('creating a frame', () => {
		it('successfully created', async () => {
			const newCar = await mongoModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

	describe('searching a frame', () => {
		it('successfully found', async () => {
			const carsFound = await mongoModel.readOne('62cf1fc6498565d94eba52cd');
			expect(carsFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await mongoModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});
});