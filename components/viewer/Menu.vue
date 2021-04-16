<template>
  <v-list>
    <v-list-item>
      <v-list-item-title
        ><h3>{{ $t('コンテンツ') }}</h3>
      </v-list-item-title>
    </v-list-item>
    <template v-for="(item, key) in items"> <!-- v-list-group -->
      <template v-if="item.children">
        <v-list-group  no-action sub-group :key="key">
          <template #activator>
            <v-list-item-content> <!--  @click="id = item.id" -->
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <template v-for="(item2, key2) in item.children">

            <template v-if="item2.children">

              <v-list-group  no-action sub-group :key="key2">
                <template #activator>
                  <v-list-item-content> <!--  @click="id = item2.id" -->
                    <v-list-item-title>{{ item2.label }}</v-list-item-title>
                  </v-list-item-content>
                </template>

                <template v-for="(item3, key3) in item2.children">
                  <v-list-item
                    v-if="item3.label"
                    :key="key3"
                    :disabled="item3.disabled"
                    @click="id = item3.id"
                  >
                    <v-list-item-title>{{ item3.label }}</v-list-item-title>
                  </v-list-item>
                </template>
              </v-list-group>

            </template>
            <template v-else>
              <v-list-item
                  v-if="item2.label"
                  :key="key2"
                  :disabled="item2.disabled"
                  @click="id = item2.id"
                >
                  <v-list-item-title>{{ item2.label }}</v-list-item-title>
                </v-list-item>
            </template>
          </template>
        </v-list-group>

      </template>
      <template v-else>
        <v-list-item :key="key" 
                
              :disabled="item.disabled"
              @click="id = item.id"
            >
              <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
      </template>
    </template> <!-- v-list-group -->
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import $ from 'jquery'

@Component({})
export default class Menu extends Vue {
  //@Prop()
  //items!: any[]

  get id(): any {
    return this.$store.getters.getId
  }

  set id(value) {
    this.$store.commit('setId', value)
  }

  get xml(): any {
    return this.$store.getters.getXml
  }

  items: any = []

  created(){
    const xml = $(this.xml)
    const text = xml.find("tei-text")[0]
    
    
    if(text.getAttribute("type") === "diary"){
      this.items = this.aaa(text)
    } else if(text.getAttribute("type") === "volume"){
      this.items = this.bbb(text)
    }
    
  }

  
  aaa(element: any){

    const menu: any[] = []

    //----------
    //フロント

    const childrenOfFront = $($(element).find("tei-front")[0]).children()

    for(const child of childrenOfFront){      

      if(child.hasAttribute("xml:id") && $(child).find("tei-head").length > 0){
        
        menu.push(
          {
            "label" : $(child).find("tei-head")[0].textContent,
            "id" : child.getAttribute("xml:id"),
          }
        )
      }
    }

    //-------

    const childrenOfGroup = $($(element).find("tei-group")[0]).children()

    //const newChildrenOfGroup: any[] = []

    for(const child of childrenOfGroup){
      if(child.hasAttribute("xml:id")){

        let head: any = "No Title"
        if($(child).find("tei-head").length > 0){
          head = $(child).find("tei-head")[0].textContent
        }
        
        menu.push(
          {
            "label" : head,
            "id" : child.getAttribute("xml:id"),
          }
        )
      }
    }

    return menu

  }
  

  bbb(element: any){

    const menu: any[] = []
    const childrenOfFront = $($(element).find("tei-front")[0]).children()

    for(const child of childrenOfFront){
      if(child.hasAttribute("xml:id") && $(child).find("tei-head").length > 0){
        
        menu.push(
          {
            "label" : $(child).find("tei-head")[0].textContent,
            "id" : child.getAttribute("xml:id"),
          }
        )
      }
    }

    //-------

    const childrenOfGroup = $($(element).find("tei-group")[0]).children()

    const diary = $(childrenOfGroup)[0]

    const menu2 = {
      "label" : "日記",
      "disabled" : true,
      "id" : "diary",
      "children" : this.aaa(diary)
    }

    menu.push(menu2)

    const schedule = $(childrenOfGroup)[2]//.find("tei-text")[1]

    const menu3 = {
      "label" : "日時通知表",
      "disabled" : true,
      "id" : "schedule",
      "children" : this.aaa(schedule)
    }

    menu.push(menu3)

    
    return menu

  }

  
}
</script>
