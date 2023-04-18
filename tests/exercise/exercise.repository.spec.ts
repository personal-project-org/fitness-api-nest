import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../src/infrastructure/prisma/prisma.module';
import { PrismaService } from '../../src/infrastructure/prisma/prisma.service';
import {
  ExerciseCreateRequest,
  ExerciseRepository,
  ExerciseUpdateRequestData,
} from '../../src/api/exercises/repository/exercise.repository';
import { ExerciseApiModule } from '../../src/api/exercises/exercise-api.module';

describe('ExerciseRepository', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let exerciseRepository: ExerciseRepository;

  jest.setTimeout(99999);

  //Why: Emulates the NestJS runtime before a test, like a fake main.ts
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [PrismaModule, ExerciseApiModule],
    }).compile();

    module = await module.init();

    exerciseRepository = module.get<ExerciseRepository>(ExerciseRepository);
    expect(exerciseRepository).toBeDefined();

    prisma = module.get<PrismaService>(PrismaService);
    expect(prisma).toBeDefined();
  });

  afterEach(async () => {
    await prisma.exercise.deleteMany({});
  });

  describe('createExercise', () => {
    it('Should create a new exercise successfully when correctly called', async () => {
      const exerciseCreateRequest: ExerciseCreateRequest = {
        name: 'Squat',
        type: 'Strength',
        body_part: 'Legs',
      };
      const exerciseCreateResult = await exerciseRepository.create(
        exerciseCreateRequest,
      );
      const createdExercise = exerciseCreateResult.unwrap();
      expect(exerciseCreateResult).toBeTruthy();
      expect(exerciseCreateResult.isOk).toBeTruthy();

      const exerciseFindResult = await prisma.exercise.findUnique({
        where: {
          id: createdExercise.id,
        },
      });

      expect(exerciseFindResult).toBeTruthy();
      expect(createdExercise.name).toEqual('Squat');
      expect(createdExercise.type).toEqual('Strength');
      expect(createdExercise.body_part).toEqual('Legs');
    });
  });

  describe('getAllExercises', () => {
    it('Should return all exercises stored in the repository.', async () => {
      const exerciseCreateRequest: ExerciseCreateRequest[] = [
        {
          name: 'Squat',
          type: 'Strength',
          body_part: 'Legs',
        },
        {
          name: 'Bench',
          type: 'Strength',
          body_part: 'Chest',
        },
        {
          name: 'Deadlift',
          type: 'Strength',
          body_part: 'Legs',
        },
      ];

      await exerciseRepository.create(exerciseCreateRequest[0]);
      await exerciseRepository.create(exerciseCreateRequest[1]);
      await exerciseRepository.create(exerciseCreateRequest[2]);

      // await exerciseCreateRequest.map(async (e) => await exerciseRepository.create(e));
      const getAllResult = (
        await exerciseRepository.getAllExercises()
      ).unwrap();
      expect(getAllResult).toBeTruthy();
      expect(getAllResult).toHaveLength(3);
      expect(getAllResult[0].name).toEqual('Squat');
      expect(getAllResult[1].name).toEqual('Bench');
      expect(getAllResult[2].name).toEqual('Deadlift');
    });
  });

  describe('deleteExercises', () => {
    it('Should delete specified exercises.', async () => {
      const exerciseCreateRequest: ExerciseCreateRequest[] = [
        {
          name: 'Squat',
          type: 'Strength',
          body_part: 'Legs',
        },
        {
          name: 'Bench',
          type: 'Strength',
          body_part: 'Chest',
        },
        {
          name: 'Deadlift',
          type: 'Strength',
          body_part: 'Legs',
        },
      ];

      await exerciseRepository.create(exerciseCreateRequest[0]);
      await exerciseRepository.create(exerciseCreateRequest[1]);
      await exerciseRepository.create(exerciseCreateRequest[2]);
      const getAllResult = (
        await exerciseRepository.getAllExercises()
      ).unwrap();
      const ids = getAllResult.map((e) => e.id);

      const deleteManyResult = (
        await exerciseRepository.deleteMany(ids)
      ).unwrap();
      expect(deleteManyResult).toBeTruthy();
      expect(deleteManyResult).toBe(3);

      const getAllResultPostDelete = (
        await exerciseRepository.getAllExercises()
      ).unwrap();
      expect(getAllResultPostDelete).toHaveLength(0);
    });
  });

  describe('updateExercise', () => {
    it('Should update a exercise name and all other fields', async () => {
      const exerciseCreateRequest: ExerciseCreateRequest = {
        name: 'Squat',
        type: 'Strength',
        body_part: 'Legs',
      };

      const exerciseCreateResult = await exerciseRepository.create(
        exerciseCreateRequest,
      );

      const exerciseUpdateRequest: ExerciseUpdateRequestData = {
        id: exerciseCreateResult.unwrap().id,
        name: 'Bulgarian Split Squat',
        type: 'Strength',
        body_part: 'Quads',
      };

      await exerciseRepository.update(exerciseUpdateRequest);

      const postUpdateExercise = await prisma.exercise.findUnique({
        where: {
          id: exerciseCreateResult.unwrap().id,
        },
      });

      expect(postUpdateExercise.id).toEqual(exerciseCreateResult.unwrap().id);
      expect(postUpdateExercise.name).toEqual('Bulgarian Split Squat');
      expect(postUpdateExercise.type).toEqual('Strength');
      expect(postUpdateExercise.body_part).toEqual('Quads');
    });
  });
});
