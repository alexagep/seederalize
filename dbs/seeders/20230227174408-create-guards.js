
export default {
  async up(queryInterface) {

    await queryInterface.bulkInsert(
      'Guards',
      [{ "id": "d3293234-d62c-47be-9c27-5a42f0b1ec23", "profile": "{}", "created_at": "2023-02-26T20:43:32.134Z", "updated_at": "2023-02-26T20:43:32.134Z", "username": "xKihLVnJ5B", "password": "$2a$12$50sxoYzlDFji3YArKKZFdu0LmYyr2Vgk1nuigoJ1jv6I986AZIjMS", "role": "user" }, { "id": "2d00d0d4-2928-4619-a798-e94db912b09b", "profile": "{}", "created_at": "2023-02-26T20:43:32.462Z", "updated_at": "2023-02-26T20:43:32.462Z", "username": "eV8QpXazMq", "password": "$2a$12$Xf/YnZKtXd1BhGVNtfsiNeVLeOckRouuYrdoqChAK0D4.M8Ei0456", "role": "guard" }, { "id": "ba661263-8e0f-4e58-aa95-9e72f207d0a7", "profile": "{}", "created_at": "2023-02-26T20:43:32.781Z", "updated_at": "2023-02-26T20:43:32.781Z", "username": "BzeNUtzw9A", "password": "$2a$12$AGOV2sW5lqfI58oaNo8F1eURb3Q6UXSBEkLYWMl5UqtrFcpgoJmV2", "role": "maintainer" }, { "id": "f7c1c383-142f-49ce-8c4e-274f12a76f5e", "profile": "{}", "created_at": "2023-02-26T20:43:33.098Z", "updated_at": "2023-02-26T20:43:33.098Z", "username": "RuQ5jL4rD2", "password": "$2a$12$eSyXqX1zoZl7e2gUy7AZhOO7aTufElqZQMylNddcn9P.Sv55epj6C", "role": "developer" }, { "id": "4ca2f49f-9248-4be9-9185-35b64ffa6d7e", "profile": "{}", "created_at": "2023-02-26T20:43:33.415Z", "updated_at": "2023-02-26T20:43:33.415Z", "username": "4iFB0PHPxX", "password": "$2a$12$cxysKPiQ272UHojlQkv..uxoBA0lqjAH/BUjdHkub5YHp/x719r32", "role": "hr" }],
      {}
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Guards', null, {})
  },
}