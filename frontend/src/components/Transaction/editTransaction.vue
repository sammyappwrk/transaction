<template>
<div class="container">
    <h2 class="text-center">Edit Transaction</h2>
    <div class="row">
        <div class="col-md-12">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <form>
            <div class="form-group">
                <label>Transaction Type</label>  
                   <select class="form-control" v-model="transactionData.transaction_type" :disabled="true">
                   <option v-for="item in transactionTypes" :key="item.key" :val="item.val"> {{ item.val }} </option>
                   </select>   
            </div>
            <div class="form-group">
                <label>Amount</label>  
                    <input type="number" class="form-control" v-model="transactionData.amount" :disabled="true">
                    <p v-if="errorShow['amount']" :class="['alert alert-danger col-md-12']"> {{errorShow['amount']}} </p>  
            </div>
            <div class="form-group">
                <label>Amount</label>  
                   <label>Description</label>
                    <textarea type="text" rows="5" class="form-control" v-model="transactionData.description"></textarea>
                    <p v-if="errorShow['description']" :class="['alert alert-danger col-md-12']"> {{errorShow['description']}} </p>  
            </div>
             <div class="form-group">
                    <button type="button" class="btn btn-primary " @click="updateTransaction()">Update</button>
                    </div>
            </form>
        </div>  
    </div>  
</div>
</template>
<script>
import axios from 'axios'
export default{
    name: 'editTransaction',
    data() {
        return {
            transactionData : {},
            errorShow: {},
             loading: true,
            transactionTypes: {
                2: {id:'Credit',key:'Credit',val:'Credit'},
                3: {id:'Debit',key:'Debit',val:'Debit'}
            }
        };
    },
    mounted(){
        this.getTransaction(this.$route.params.transactionId);
    },
    methods: {
            async getTransaction(transactionId){
                console.log(transactionId);
                axios.get('http://localhost:3000/getTransaction/'+transactionId)
                .then(response => {
                            this.transactionData = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => this.loading = false)
            },
            async updateTransaction(){
                axios.post('http://localhost:3000/updateTransaction/'+this.$route.params.transactionId,this.transactionData)
                .then(response => {
                    if(response.data.status == 'error')
                    {
                        console.log(response.data);
                        this.errorShow = response.data.results;
                    }
                    else{
                        this.$router.push({name : 'trasactionList'})
                    }
                    
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => this.loading = false)
            }
    }
}
</script>