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
    const postTitle = 'New Post';
    const postBody = 'This is a new post';

    cy.contains(postTitle).should('not.exist');
    createNewPost(postTitle, postBody);
    cy.visit('http://localhost:3000'); // reload page
    cy.contains(postTitle).should('exist');
    deletePostByTitle(postTitle);
  });

  it('should delete post on clicking the delete button', () => {
    const postTitle = 'Delete this Post';
    const postBody = 'This post gets deleted';
    createNewPost(postTitle, postBody);
    cy.contains(postTitle).should('exist');

    deletePostByTitle(postTitle);

    cy.contains(postTitle).should('not.exist');
  });
});

function createNewPost(title: string, body: string): void {
  cy.get("[name='postTitle']").type(title);
  cy.get("[name='postBody']").type(body);
  cy.contains('button', 'Add Post').click();
}

function deletePostByTitle(title: string): void {
  cy.contains('li', title).find('button').click();
}
