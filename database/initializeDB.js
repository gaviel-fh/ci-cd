// #!/usr/bin/mongo
// # mongoimport -d test -c posts --drop --file ./posts.json --jsonArray -u "david" -p "password" --authenticationDatabase admin
// # mongo test --eval 'db.posts.remove()'
// # mongorestore --drop --db test --collection posts /home/data/posts.bson -u david -p password --authenticationDatabase admin
// const db = new Mongo().getSiblingDB("test");
// db.posts.remove();
// db.createCollection("posts");
posts = [
  {
    title: "First Post",
    body: "This is my first Post",
  },
  {
    title: "Second Post",
    body: "This is my second Post",
  },
  {
    title: "Third Post",
    body: "This is my third Post",
  },
];

// db.posts.InsertMany(posts);

print(
  "Start #################################################################"
);

db = db.getSiblingDB("api_prod_db");
db.createUser({
  user: "api_user",
  pwd: "api1234",
  roles: [{ role: "readWrite", db: "api_prod_db" }],
});
db.createCollection("users");

db = db.getSiblingDB("api_dev_db");
db.createUser({
  user: "api_user",
  pwd: "api1234",
  roles: [{ role: "readWrite", db: "api_dev_db" }],
});
db.createCollection("users");

db = db.getSiblingDB("api_test_db");
db.createUser({
  user: "api_user",
  pwd: "api1234",
  roles: [{ role: "readWrite", db: "api_test_db" }],
});
db.createCollection("users");

print(
  "Filling Test DB #################################################################"
);
db = new Mongo().getDB("api_test_db");
db.createCollection("posts");

db.posts.InsertMany(posts);

print("END #################################################################");
