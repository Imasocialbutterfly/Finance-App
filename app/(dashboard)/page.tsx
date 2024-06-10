"use client"

import { Button } from "@/components/ui/button"
import { useNewAccoount } from "@/features/accounts/hooks/use-new-account"

export default function Home() {
    const {onOpen} = useNewAccoount()

    return (
        <div>
            <Button onClick={onOpen}>
                Add and account
            </Button>
        </div>
    )
}
