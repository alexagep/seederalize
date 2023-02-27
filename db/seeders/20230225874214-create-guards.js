
  export default {
    async up(queryInterface) {
  
      await queryInterface.bulkInsert(
        'Guards',
          [{"id":"12fc6e7b-a863-47e4-a38a-a67a273c23d7","profile":"{}","created_at":"2023-02-27T18:59:39.085Z","updated_at":"2023-02-27T18:59:39.085Z","username":"1h1ZfMAWN0","password":"$2a$12$vMiJFLel45OZI.84irWr0uE8s8DCRUdNLWtyYPKwcF0pmOpcjyLMm","role":"hr"}],
        {}
      )
    },
  
    async down(queryInterface) {
      await queryInterface.bulkDelete('Guards', null, {})
    },
  }