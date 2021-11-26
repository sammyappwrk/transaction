<template>
  <div>
    
    <table class="table is-striped is-bordered mt-2 is-fullwidth">
      <thead>
        <tr>
         <th>Date</th>
          <th>Amount</th>
          <th>Transaction Type</th>
           <th class="has-text-centered">Total Amount</th>
           <th class="has-text-centered">Description</th>
           <th class="has-text-centered">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
        <td>{{ formatDate(item.createdAt) }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.transaction_type }}</td>
           <td>{{ item.total_amount }}</td>
            <td>{{ item.description }}</td>
          <td class="has-text-centered">
           <router-link class="btn btn-success btn-sm" :to="{ name: 'editTransaction', params: { transactionId: item.id }}">Edit</router-link> | 
          <button type="button" class="btn btn-success btn-sm" @click="deleteTranaction(item.id )">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="card-footer pb-0 pt-3">
            <ul v-if="pager.pages && pager.pages.length" class="pagination">
                <li :class="{'disabled':pager.currentPage == 1}" class="page-item first-item">
                    <a @click="updatePage(1)"  class="page-link">First</a>
                </li>
                <li :class="{'disabled':pager.currentPage == 1}" class="page-item previous-item">
                    <a @click="updatePage(pager.currentPage - 1)"  class="page-link">Previous</a>
                </li>
                <li v-for="page in pager.pages" :key="page" :class="{'active':pager.currentPage === page}" class="page-item number-item">
                <a @click="updatePage(page)"  class="page-link">{{page}}</a>
                </li>
                <li :class="{'disabled':pager.currentPage == pager.totalPages}" class="page-item next-item">
                  <a @click="updatePage(+this.pager.currentPage + 1)"  class="page-link">Next</a>
                </li>
                <li :class="{'disabled':pager.currentPage == pager.totalPages}" class="page-item last-item">
                <a @click="updatePage(pager.totalPages)"  class="page-link">Last</a>
                </li>
            </ul>
        </div>
  </div>
</template>
  
<script>
// import axios
import axios from "axios";

export default {
  name: "transactionList",
  data() {
    return {
      items: [],
      pager: {},
      currentPage:1,
      limit: 25,
    };
  },
  created() {
    this.getProducts();
  },
  
  methods: {
    // Get All Products
    async getProducts() {
      try {
        this.items = [];
        const response = await axios.get('http://localhost:3000/listTranscation/'+this.currentPage+'/'+this.limit);
        console.log(response.data);
        //alert(response.data);
         this.pager = response.data.pager;
        this.items = response.data.article.rows;
      } catch (err) {
        console.log('error');
        console.log(err);
      }
    },
    updatePage(pageNumber)
    {
      this.currentPage = pageNumber;
      this.getProducts();
    },
    formatDate(dateString) {
            const options = { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" , second: "numeric"};
            const date = new Date(dateString);
            return new Intl.DateTimeFormat("en-US", options).format(date);
        },
    // Delete Transaction
    async deleteTranaction(transactionId){
      if(confirm("Do you really want to delete?")){
        axios.get('http://localhost:3000/deleteTransaction/'+transactionId)
        .then(response => {
          console.log(response);
            this.getProducts();
        })
      }
    }
  },
};
</script>
  
<style>
a.page-link {
    cursor: pointer;
}
</style>