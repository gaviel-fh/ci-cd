describe('spec.cy.ts', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should load posts from backend', () => {
    cy.get('li').then((posts) => {
      expect(posts.length).equal(7);
    });
  });

  it('should add new post that persist after page reload', () => {
    cy.contains('New Post').should('not.exist');
    createNewPost('New Post', 'This is a new post');
    cy.visit('http://localhost:3000');
    cy.contains('New Post');
  });
});

function createNewPost(title: string, body: string): void {
  cy.get("[name='postTitle']").type(title);
  cy.get("[name='postBody']").type(body);
  cy.contains('button', 'Add Post').click();
}
