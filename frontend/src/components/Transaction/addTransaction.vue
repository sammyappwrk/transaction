<template>
<div class="container">
        <h2 class="text-center">Create Transaction</h2>
        <div class="row">
            <div class="col-md-12">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form>
                    <div class="form-group">
                        <label>Transaction Type</label>
                        <select class="form-control" v-model="product.transaction_type">
                        <option v-for="item in transactionTypes" :key="item.id" :val="item.val" :selected= "item.val == Credit">
                              {{item.val}}
                        </option>
                        </select>
                      <p v-if="errorShow['transaction_type']" :class="['alert alert-danger col-md-12']"> {{ errorShow['transaction_type']}}</p>         
                    </div>
                    <div class="form-group">
                        <label>Amount</label>
                        <input type="number" class="form-control" v-model="product.amount">
                        <p v-if="errorShow['amount']" :class="['alert alert-danger col-md-12']">{{ errorShow['amount'] }}</p>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea type="text" rows="5" class="form-control" v-model="product.description"></textarea>
                        <p v-if="errorShow['description']" :class="['alert alert-danger col-md-12']"> {{errorShow['description']}} </p>
                    </div>
                    <div class="form-group">
                    <button type="button" class="btn btn-primary " @click="createProduct()">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
  export default{
    name : "addTransaction",
    data(){
      return {
        product : {},
        errorShow: {},
        loading: true,
        transactionTypes : {
          2: {id:'Credit',key:'Credit',val:'Credit'},
          3: {id:'Debit',key:'Debit',val:'Debit'}
        }
      };
    },
    methods: {
      async createProduct(){
        let errorShow = this.errorShow = {};
        if( typeof this.product.amount === 'undefined' || this.product.amount == null){
          errorShow['amount'] = 'Amount is required';
        }
        if( typeof this.product.transaction_type === 'undefined' || this.product.transaction_type == null  || this.product.transaction_type == ''){
          errorShow['transaction_type'] = 'Transaction Type is required';
        }
        if( typeof this.product.description === 'undefined' || this.product.description == null  || this.product.description == ''){
          errorShow['description'] = 'Description is required';
        }
        if(Object.keys(this.errorShow).length === 0)
        {
                        await axios.post('http://localhost:3000/create',this.product)
                        .then(response => {
                          console.log(response.data);
                          if(response.data.status == 'error')
                            {
                              this.errorShow = response.data.results
                            }
                            else{
                              this.$router.push({ name: 'trasactionList' })
                            }
                      })
                      .catch(error => {
                        console.log(error)
                      })
                      .finally(() => this.loading = false)
        }
        else{
          //alert(this.errorShow);
          console.log(errorShow);
        }
      }
    }
  }

</script>