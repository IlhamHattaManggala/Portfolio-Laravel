import PortfolioController from './PortfolioController'
import Admin from './Admin'
import Settings from './Settings'
const Controllers = {
    PortfolioController: Object.assign(PortfolioController, PortfolioController),
Admin: Object.assign(Admin, Admin),
Settings: Object.assign(Settings, Settings),
}

export default Controllers