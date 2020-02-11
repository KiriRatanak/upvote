const submissionComponent = {
	template: 
		`<div class="vote-card" :class="{'blue-border': submission.votes >= 20 }">
			<figure><img :src="getImage(submission)" alt="submission-image"></figure>
			<div class="content">
				<a :href="submission.url" class="card-title">{{ submission.title }}</a>
				<span class="card-id">#{{ submission.id }}</span><br>
				<span class="card-desc">{{ submission.description }}</span><br>
				<span class="submit-section">Submitted by: <img class="avatar" :src="getAvatar(submission)" alt="avatar"></span>
			</div>
			<div class="upvote-section">
				<span @click="upvote(submission.id)"> 
					<i class="fa fa-chevron-up"></i>
					<span class="upvote">{{ submission.votes }}</span>
				</span>
			</div>
		</div>`,
	props: ['submission', 'submissions', 'index'],
	methods: {
		upvote(submissionId) {
			const submission = this.submissions.find(
				submission => submission.id === submissionId
			)
			submission.votes++
		},
		getImage(submission) {
			return '../public/images/submissions/' + submission.submissionImage + '.png';
		},
		getAvatar(submission) {
			return '../public/images/avatars/' + submission.avatar + '.png'
		}
	}
}

new Vue({
	el: '#app',
	components: {
		'submission-component': submissionComponent
	},
	data: {
		submissions: Seed.submissions,
		title: 'Upvote!'
	},
	computed: {
		sortedSubmissions() {
			return this.submissions.sort((a, b) => {
				return b.votes - a.votes
			})
		}
	},
})