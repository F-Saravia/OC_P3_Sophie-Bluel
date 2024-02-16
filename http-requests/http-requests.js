const routes = {
    'login': () => "http://localhost:5678/api/users/login",
    'get-categories': () => "http://localhost:5678/api/categories",
    'get-works': () => "http://localhost:5678/api/works",
    'post-work': () => "http://localhost:5678/api/works",
    'delete-work': (id) => `http://localhost:5678/api/works/${id}`
}