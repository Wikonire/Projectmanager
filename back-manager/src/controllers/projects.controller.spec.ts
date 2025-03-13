import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectService } from '../repositories/project.service';
import { ProjectEntity } from '../entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/project.dto';

describe('ProjectsController', () => {
    let projectsController: ProjectsController;
    let projectService: ProjectService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProjectsController],
            providers: [
                {
                    provide: ProjectService,
                    useValue: {
                        findAllActive: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Project', description: 'A test project' }]),
                        findAllArchived: jest.fn().mockResolvedValue([{ id: '2', title: 'Archived Project', description: 'Archived' }]),
                        findOne: jest.fn().mockImplementation((id: string) =>
                            Promise.resolve({ id, title: `Project ${id}`, description: 'Project description' })),
                        create: jest.fn().mockImplementation((dto: CreateProjectDto) =>
                            Promise.resolve({ id: '3', ...dto })),
                        update: jest.fn().mockImplementation((id: string, dto: UpdateProjectDto) =>
                            Promise.resolve({ id, ...dto })),
                        remove: jest.fn().mockResolvedValue(undefined),
                    },
                },
            ],
        }).compile();

        projectsController = module.get<ProjectsController>(ProjectsController);
        projectService = module.get<ProjectService>(ProjectService);
    });

    it('should be defined', () => {
        expect(projectsController).toBeDefined();
    });

    it('should return all active projects', async () => {
        const result = await projectsController.findAll();
        expect(result).toEqual([{ id: '1', title: 'Test Project', description: 'A test project' }]);
        expect(projectService.findAllActive).toHaveBeenCalled();
    });

    it('should return all archived projects', async () => {
        const result = await projectsController.findAllArchived();
        expect(result).toEqual([{ id: '2', title: 'Archived Project', description: 'Archived' }]);
        expect(projectService.findAllArchived).toHaveBeenCalled();
    });

    it('should return one project by id', async () => {
        const result = await projectsController.findOne('1');
        expect(result).toEqual({ id: '1', title: 'Project 1', description: 'Project description' });
        expect(projectService.findOne).toHaveBeenCalledWith('1');
    });

    it('should create a new project', async () => {
        const createProjectDto: CreateProjectDto = { title: 'New Project', description: 'New project description' };
        const result = await projectsController.create(createProjectDto);
        expect(result).toEqual({ id: '3', title: 'New Project', description: 'New project description' });
        expect(projectService.create).toHaveBeenCalledWith(createProjectDto);
    });

    it('should update an existing project', async () => {
        const updateProjectDto: UpdateProjectDto = { title: 'Updated Title', description: 'Updated description' };
        const result = await projectsController.update('1', updateProjectDto);
        expect(result).toEqual({ id: '1', title: 'Updated Title', description: 'Updated description' });
        expect(projectService.update).toHaveBeenCalledWith('1', updateProjectDto);
    });

    it('should delete a project', async () => {
        const result = await projectsController.remove('1');
        expect(result).toBeUndefined();
        expect(projectService.remove).toHaveBeenCalledWith('1');
    });
});
