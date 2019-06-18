async function finalisePropertyLease(parent, args, ctx, info) {
  // const reqUserId = ctx.request.userId
  const reqUserId = "cjwq51kvcdy740b428jvm6phc"

  // if (!reqUserId) {
  //   throw new Error("You must be logged in to finalise a lease")
  // }
  const leaseId = args.leaseId
  // 1. get the property lease via the id and all of the data we will need
  const lease = await ctx.db.query.propertyLease(
    {
      where: {
        id: leaseId,
      },
    },
    `{
      id
      lessors {
        id
        signed
        user {
          id
        }
      }
      lessees {
        id
        signed
        user {
          id
        }
      }
    }`
  )

  const lessorIds = lease.lessors.map(lessor => lessor.user.id)
  const lesseeIds = lease.lessees.map(lessee => lessee.user.id)
  const lessorSignatures = lease.lessors.map(lessor => lessor.signed)
  const lesseeSignatures = lease.lessees.map(lessee => lessee.signed)

  /**
   * validation stuff is an example of why we want to do this and extract to files
   */
  const isALessor = !lessorIds.includes(reqUserId)
  if (!isALessor) {
    throw new Error("You must be a lessor to finalise this lease")
  }

  const allLessorsSigned = !lessorSignatures.includes(false)
  if (!allLessorsSigned) {
    throw new Error("Not all lessors have signed this lease yet")
  }

  const allLesseesSigned = !lesseeSignatures.includes(false)
  if (!allLesseesSigned) {
    throw new Error("Not all lessees have signed this lease yet")
  }

  const acceptedLease = ctx.db.mutation.updatePropertyLease({
    where: {
      id: leaseId,
    },
    data: {
      finalised: true,
    },
  })

  /**
   * ^^^^ Well that worked out not too bad for a drunken spreee
   * leave it alone
   */

  // 2. check that the user making this request is one of the lessors
  // 3. validate that everything has been signed. NOTE: when certain variables are updated for a lease it should unsign if not finalised
  // NOTE: should split this out into folders so finalisePropertyLease/index is the function that is called, then we have args and context and can use
  // other things to validate

  // 4. do the finalise mutation
  // 5. charge the lessors or however it has been setup to charge
  // 6. return success message
  const message = {
    message:
      "Property Lease is now Legal: ToDo: => accept mutation and charge cards",
  }
  return message
}

module.exports = finalisePropertyLease
