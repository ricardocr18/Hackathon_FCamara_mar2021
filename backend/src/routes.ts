import { Router } from 'express';
import DonationController from './app/controllers/DonationController';
import ListController from './app/controllers/ListController';
import PaperStoreController from './app/controllers/PaperStoreController';
import ParentController from './app/controllers/ParentController';
import ProductController from './app/controllers/ProductController';
import ProductsListController from './app/controllers/ProductsListController';
import SchoolController from './app/controllers/SchoolController';
import StudentController from './app/controllers/StudentController';
import AuthController from './app/controllers/AuthController';
import AuthMiddleware from './app/middlewares/authMiddleware';

const routes = Router();

routes.post('/auth/parent', AuthController.authenticateParent); // Criar pai
routes.post('/auth/store', AuthController.authenticatePaperStore); // Criar pai

routes.post('/paperStore', PaperStoreController.store);
routes.post('/parent', ParentController.store); // Criar pai
routes.get('/list/student/:id', ListController.findByStudent); // Lista por estudante
routes.get('/school', SchoolController.index); // Listagem de escolas
routes.get('/list', ListController.index); // Listar listas
routes.get('/list/:id', ListController.find); // Listar itens de uma lista especifica
routes.get('/paperStore', PaperStoreController.index); // Listagem de papelarias
routes.get('/products/paperStore/:id', ProductController.findByPaperStore); // Listagem de produtos de determinada papelaria

routes.post('/donate', DonationController.donation); // Realizar doação

routes.use(AuthMiddleware);
routes.post('/student', StudentController.store); // Criar filho
routes.post('/list', ListController.store); // Criar lista
routes.post('/donationConfirmation', DonationController.confirmTransaction); // Confirmar doação
routes.post('/productsList', ProductsListController.store); // Adicionar produto na lista
routes.get('/student/parent', StudentController.findByParent); // Achar filho por pai
routes.post('/products', ProductController.store);
routes.post('/paperStore/money', PaperStoreController.getMoney);
routes.get('/paperStore/info', PaperStoreController.info);

// Doador

export default routes;
