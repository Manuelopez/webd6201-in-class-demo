let core;
(function (core) {
  class Router {
    // public proterties get and set

    /**
     * @returns {string}
     */
    get ActiveLink() {
      return this.m_activeLink;
    }

    /**
     * @params {string} link
     */
    set ActiveLink(link) {
      this.m_activeLink = link;
    }

    /**
     * @constructor
     */
    constructor() {
      this.ActiveLink = '';
    }

    //public methdods - paths for methods
    /**
     * this methods add a new route to the routing table
     * @param {string[]} route
     * @return {void}
     */
    Add(route) {
      this.m_routingtable.push(route);
    }

    /**
     * This methods replaces the references for the routing table with a new one
     * Note: Routes should begin with a '/' character
     * @param {string} routingTable
     * @returns {void}
     */
    AddRoutingTable(routingTable) {
      this.m_routingtable = routingTable;
    }

    /**
     * This method finds and returns the index of the orute in the oruting gtalbe
     * @param {string} route
     * @returns {number}
     */
    Find(route) {
      return this.m_routingtable.indexOf(route);
    }

    /**
     * This methods removes a route from the routing table
     * It returns true if the route is removed otherwise it returns false
     * @param {string} route
     * @returns {boolean}
     */
    Remove(route) {
      //if route is found
      if (this.Find(route) > -1) {
        this.m_routingtable.splice(this.Find(route), 1);
        return true;
      }
      return false;
    }

    //public overrides method
    /**
     * This method overrides the bult in to string method
     * and returns the routing table in a comma-separated string
     * @returns {string}
     */
    toString() {
      return this.m_routingtable.toString();
    }
  }
  core.Router = Router;
})(core || (core = {}));

let router = new core.Router();

let routingTable = [
  '/',
  '/home',
  '/about',
  'services',
  '/contact',
  '/contact-list',
  '/projects',
  '/register',
  '/login',
  '/edit',
];

let rotue = location.pathname;
// if rote is found in the routing table

if (router.Find(route) > -1) {
  router.ActiveLink = route === '/' ? 'home' : route.substring(1);
} else {
  rotuer.ActiveLink = '404';
}

// variable  = (if condtion) > () : (false)
router.ActiveLink =
  router.Find(route) > -1
    ? route == '/'
      ? 'home'
      : route.substring(1)
    : '404';
