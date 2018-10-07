const defineElements = {
  vueli: {
    props: {
      aaa: Number,
      liCName: String,
      spanCName: String,
      divCName: String,
      arr: Array,
      content: String,
      content1: String
    },
    template: 
    `<ol>
      <li :class="liCName" v-for="item in arr">
      <span :class="spanCName">{{ item[content] }}</span>
      <span class="ctlButton">
        <div :class="divCName">{{ item[content1] }}</div>
        <button class="add" @click="ctlNums('add', item, item[content].slice(-2))"> + </button>        
        <button class="substract" @click="ctlNums('substract', item, item[content].slice(-2))"> - </button>
      </span>
      </li>
    </ol>`
  },
  test: {
    //template: '<h3>Showing child {{signal}}</h3>',
    //props: ['signal']
  }
}

export default defineElements