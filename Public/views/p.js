export const load = {
  user: {
    create: {
      account: {
        name: 'blabla',
        password: '3456',
        telephone: '+79998627441',
        carte: '3456876509871235',
        imgProfile: []
      },
      contacts: [],
      //currentTransaction:'',
      transactions: [],
      messenger: {
        opened: [],
        closed: [],
      },
      preference: {
        nigthMode: true,
        currentDevise: 'rub',
        watcthDifference: 'rub/xof'
      }
    }
  },
  entreprise: {
    create: {
      transactions: [],
      managers: [{
        account: {
          name: 'Manager001',
          password: '0001',
          telephone: '+79998627001',
          carte: '3456876509871001',
          imgProfile: []
        },
        contacts: [],
        transactions: [],
        messenger: {
          opened: [],
          closed: [],
        },
        preference: {
          nigthMode: true,
          currentDevise: 'rub',
          watcthDifference: 'rub/xof'
        },
      },{
        account: {
          name: 'Manager002',
          password: '0002',
          telephone: '+79998627002',
          carte: '3456876509871002',
          imgProfile: []
        },
        contacts: [],
        transactions: [],
        messenger: {
          opened: [],
          closed: [],
        },
        preference: {
          nigthMode: true,
          currentDevise: 'rub',
          watcthDifference: 'rub/xof'
        },
      }],
      users:[{
        account: {
          name: 'User001',
          password: '0001',
          telephone: '+79798627001',
          carte: '9856876509871001',
          imgProfile: []
        },
        contacts: [{},{},{}],
        transactions: [],
        messenger: {
          opened: [],
          closed: [],
        },
        preference: {
          nigthMode: true,
          currentDevise: 'rub',
          watcthDifference: 'rub/xof'
        },
      },{
        account: {
          name: 'User002',
          password: '0002',
          telephone: '+79798627002',
          carte: '9856876509871002',
          imgProfile: []
        },
        contacts: [{},{},{}],
        transactions: [],
        messenger: {
          opened: [],
          closed: [],
        },
        preference: {
          nigthMode: true,
          currentDevise: 'rub',
          watcthDifference: 'rub/xof'
        },
      },{
        account: {
          name: 'User003',
          password: '0003',
          telephone: '+79798627003',
          carte: '9856876509871003',
          imgProfile: []
        },
        contacts: [{},{},{}],
        transactions: [],
        messenger: {
          opened: [],
          closed: [],
        },
        preference: {
          nigthMode: true,
          currentDevise: 'rub',
          watcthDifference: 'rub/xof'
        },
      },{
        account: {
          name: 'User004',
          password: '0004',
          telephone: '+79798627004',
          carte: '9856876509871004',
          imgProfile: []
        },
        contacts: [{},{},{}],
        transactions: [],
        messenger: {
          opened: [],
          closed: [],
        },
        preference: {
          nigthMode: true,
          currentDevise: 'rub',
          watcthDifference: 'rub/xof'
        },
      },{
        account: {
          name: 'User005',
          password: '0005',
          telephone: '+79798627005',
          carte: '9856876509871005',
          imgProfile: []
        },
        contacts: [{},{},{}],
        transactions: [],
        messenger: {
          opened: [],
          closed: [],
        },
        preference: {
          nigthMode: true,
          currentDevise: 'rub',
          watcthDifference: 'rub/xof'
        },
      }],
      serviceCharge: 0.01,
      countries: [{
        icon: 'https://cdn-icons-png.flaticon.com/512/197/197391.png',
        name: "Côte d'ivoire",
        allowCarte: true,
        agencies: [{
          name: "Orange Money",
          number:'+2250749383335',
          charge:0.01,
          managerName:'Okon Okon Jean-Luc',
          icon: 'https://1000logos.net/wp-content/uploads/2021/02/Orange-Money-emblem-500x228.png',
        },{
          name: "MTN Money",
          number:'+2250584528696',
          charge:0.01,
          managerName:'Okon Okon Jean-Luc',
          icon: 'https://www.sanwi-informatique.com/img/cms/mtn-money.png',
        },{
          name: "Wave",
          number:'+2250749383335',
          charge:0.01,
          managerName:'Okon Okon Jean-Luc',
          icon: 'https://play-lh.googleusercontent.com/NgAdQMq9Mu2NTJredx6COxScVB3tp153h_bVKQTXUt9Aou0Lz1PfffaQt5jFN9jlBfo',
        }]
      },{
        icon: 'https://cdn-icons-png.flaticon.com/512/197/197429.png',
        name: "Mali",
        allowCarte: true,
        agencies: [{
          name: "Orange Money",
          number:'+2250749383335',
          charge:0.01,
          managerName:'Okon Okon Jean-Luc',
          icon: 'https://1000logos.net/wp-content/uploads/2021/02/Orange-Money-emblem-500x228.png',
        }]
      },{
        icon: 'https://cdn-icons-png.flaticon.com/512/197/197377.png',
        name: "Sénégal",
        allowCarte: true,
        agencies: [{
          name: "Orange Money",
          number:'+2250749383335',
          charge:0.01,
          managerName:'Okon Okon Jean-Luc',
          icon: 'https://1000logos.net/wp-content/uploads/2021/02/Orange-Money-emblem-500x228.png',
        }]
      },{
        icon: 'https://cdn-icons-png.flaticon.com/512/323/323312.png',
        name: "Burkina",
        allowCarte: true,
        agencies: [{
          name: "Orange Money",
          number:'+2250749383335',
          charge:0.01,
          managerName:'Okon Okon Jean-Luc',
          icon: 'https://1000logos.net/wp-content/uploads/2021/02/Orange-Money-emblem-500x228.png',
        }]
      }, {
        icon: 'https://cdn-icons-png.flaticon.com/512/197/197443.png',
        name: "Togo",
        allowCarte: true,
        agencies: [{
          name: "MTN Money",
          number:'+22966820170',
          charge:0.01,
          managerName:'Shabi Oluwajimi Afolabi Akanni Nelson Aurel YABI',
          icon: 'https://www.sanwi-informatique.com/img/cms/mtn-money.png',
        }]
      },{
        icon: 'https://cdn-icons-png.flaticon.com/512/323/323347.png',
        name: "Beni",
        allowCarte: true,
        agencies: [{
          name: "MTN Money",
          number:'+22966820170',
          charge:0.01,
          managerName:'Shabi Oluwajimi Afolabi Akanni Nelson Aurel YABI',
          icon: 'https://www.sanwi-informatique.com/img/cms/mtn-money.png',
        }]
      },{
        icon: 'https://cdn-icons-png.flaticon.com/512/323/323337.png',
        name: "Congo Brazza",
        allowCarte: true,
        agencies: [{
          name: "Orange Money",
          number:'+237656578220',
          charge:0.01,
          managerName: 'Kendjang Takam Alex Bryan',
          icon: 'https://1000logos.net/wp-content/uploads/2021/02/Orange-Money-emblem-500x228.png',
        }]
      },{
        icon: 'https://cdn-icons-png.flaticon.com/512/323/323337.png',
        name: "Cameroun",
        allowCarte: true,
        agencies: [{
          name: "Orange Money",
          number:'+237656578220',
          charge:0.01,
          managerName: 'Kendjang Takam Alex Bryan',
          icon: 'https://1000logos.net/wp-content/uploads/2021/02/Orange-Money-emblem-500x228.png',
        }]
      }],
      openedDiscussion: []
    }
  },
  list: {
    addId: [],
    addNew: [],
    remove: [],
    paging: {
      page: 1,
      limit: 3,
      select: "",
      sort: { __createdAt: -1 },
      query: {},
    },
  },
  contact: {
    create:{
      country: 'CI',
      telephone: '+255678998778',
      carte:'53677589689089',
    }
  },
  country:{
    create:{
      icon: {
        type: String,
    },
    name: {
        type:String
    },
    allowCarte:{
        type:Boolean,
    },
    agencies:[{
        
    }]
    }
  }
};
