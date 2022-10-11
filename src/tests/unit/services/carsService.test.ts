import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/errors';
import CarsModel from '../../../models/carsModel';
import CarsService from '../../../services/carsService';
import { carMock, carMockWithId } from '../../mocks/carsMock';

describe('Frame Service', () => {
	const carsModel = new CarsModel();
	const carsService = new CarsService(carsModel);

	before(() => {
		sinon.stub(carsModel, 'create').resolves(carMockWithId);
		sinon.stub(carsModel, 'readOne')
			.onCall(0).resolves(carMockWithId) 
			.onCall(1).resolves(null); 
	})
	after(() => {
		sinon.restore()
	})
	describe('Create Frame', () => {
		it('Success', async () => {
			const carCreated = await carsService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			let error;
			try {
				await carsService.create({});
			} catch (err) {
				error = err
			}

			expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('ReadOne Frame', () => {
		it('Success', async () => {
			const carCreated = await carsService.readOne(carMockWithId._id);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
      let err:any;
			try {
				await carsService.readOne(carMockWithId._id);
			} catch (error) {
				err = error
			}

			expect(err, 'error should be defined').not.to.be.undefined;
			expect(err.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
		});
	});
});