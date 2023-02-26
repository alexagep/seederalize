
  export default {
    async up(queryInterface) {
  
      await queryInterface.bulkInsert(
        'IrisaaLogs',
          [{"guard_id":"4ca2f49f-9248-4be9-9185-35b64ffa6d7e","user_id":"20bb59a5-cde0-49be-84d7-82b53f486186","status":"success","data":"{}","updated_at":"2023-02-26T20:43:33.852Z","created_at":"2023-02-26T20:43:33.852Z","id":"f813ae20-c03c-4e04-be42-1837b606f05d"},{"guard_id":"2d00d0d4-2928-4619-a798-e94db912b09b","user_id":"efc9fc3d-f494-43ef-b56e-4703b55598b0","status":"success","data":"{}","updated_at":"2023-02-26T20:43:33.852Z","created_at":"2023-02-26T20:43:33.852Z","id":"5920d62b-d1a0-4782-ad26-ccc506d01e97"},{"guard_id":"2d00d0d4-2928-4619-a798-e94db912b09b","user_id":"20bb59a5-cde0-49be-84d7-82b53f486186","status":"error","data":"{}","updated_at":"2023-02-26T20:43:33.852Z","created_at":"2023-02-26T20:43:33.852Z","id":"5fb771c1-bcac-4777-a44e-fe8d4337a24f"},{"guard_id":"f7c1c383-142f-49ce-8c4e-274f12a76f5e","user_id":"efc9fc3d-f494-43ef-b56e-4703b55598b0","status":"error","data":"{}","updated_at":"2023-02-26T20:43:33.852Z","created_at":"2023-02-26T20:43:33.852Z","id":"29130c7a-ad1d-4256-9ae6-6eb1271b5839"},{"guard_id":"4ca2f49f-9248-4be9-9185-35b64ffa6d7e","user_id":"20bb59a5-cde0-49be-84d7-82b53f486186","status":"error","data":"{}","updated_at":"2023-02-26T20:43:33.852Z","created_at":"2023-02-26T20:43:33.852Z","id":"5c3600e9-8d4d-4a34-812c-a0270cd30df5"}],
        {}
      )
    },
  
    async down(queryInterface) {
      await queryInterface.bulkDelete('IrisaaLogs', null, {})
    },
  }