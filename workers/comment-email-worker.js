const queue=require('../config/kue');
const commentMailer=require('../mailers/comments_mailer');

queue.process('emails',function(job,done){
    console.log("job's data",job.data);
    commentMailer.newComment(job.data);
    done();
})