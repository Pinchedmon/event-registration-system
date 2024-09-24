import * as React from "react";
import { api } from "@/trpc/react";
import { toast } from "@/hooks/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "../../../../lib/utils";
import { User } from "@/server/api/schema/users";

interface Props {
  className?: string;
  teamId: string;
}

type Inputs = {
  users: {
    userId: string;
    role: "USER" | "ADMIN" | "ORGANIZER" | "REGISTRATOR";
  }[];
};

export const TeamAddUsers: React.FC<Props> = ({ className, teamId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const users = api.users.getAllUsersForTeams.useQuery();
  const [selectedUsers, setSelectedUsers] = React.useState<any>([]);
  const teamUsers = api.team.getTeamUsers.useQuery(teamId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const trpcClient = api.useUtils();
  const mutation = api.team.addUsersToTeam.useMutation({
    onMutate: () => {
      toast({
        title: "Добавление пользователей...",
      });
    },
    onError: (e: any) => {
      toast({
        title: "Ошибка",
        description: e.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Пользователи добавлены",
      });
      trpcClient.team.getTeamUsers.refetch();
    },
  });
  console.log(users, teamUsers);
  const onSubmit: SubmitHandler<Inputs> = async () => {
    mutation.mutate({
      teamId,
      users: selectedUsers,
    });
  };

  const handleUserSelect = (userId: string, role: string) => {
    const existingUser = selectedUsers.find(
      (user: any) => user.userId === userId,
    );
    if (existingUser) {
      setSelectedUsers(
        selectedUsers.map((user: any) =>
          user.userId === userId ? { ...user, role } : user,
        ),
      );
    } else {
      setSelectedUsers([...selectedUsers, { userId, role }]);
    }
  };

  const handleUserRemove = (userId: string) => {
    setSelectedUsers(
      selectedUsers.filter((user: any) => user.userId !== userId),
    );
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <p
          onClick={() => setIsOpen(true)}
          className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        >
          Добавить пользователей
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление пользователей</DialogTitle>
        </DialogHeader>
        <form
          className={cn(className, "flex w-full flex-col gap-4")}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Пользователи:</Label>
            <div className="col-span-3">
              {users.data &&
                users.data.map((user: User) => (
                  <div key={user.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.some(
                        (selectedUser: { userId: string }) =>
                          selectedUser.userId === user.id,
                      )}
                      onChange={() =>
                        selectedUsers.some(
                          (selectedUser: { userId: string }) =>
                            selectedUser.userId === user.id,
                        )
                          ? handleUserRemove(user.id as string)
                          : handleUserSelect(user.id as string, "USER")
                      }
                    />
                    <span>{user.email}</span>
                    <select
                      value={
                        selectedUsers.find(
                          (selectedUser: any) =>
                            selectedUser.userId === user.id,
                        )?.role
                      }
                      onChange={(e: any) =>
                        handleUserSelect(user.id as string, e.target.value)
                      }
                    >
                      <option value="ORGANIZER">Организатор</option>
                      <option value="REGISTRATOR">Регистратор</option>
                      {/* <option value="USER">Пользователь</option> */}
                    </select>
                    {/* <button
                      type="button"
                      onClick={() => handleUserRemove(user.id as string)}
                    >
                      Удалить
                    </button> */}
                  </div>
                ))}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Уже подключенные пользователи:</Label>
            <div className="col-span-3">
              {teamUsers.data &&
                teamUsers.data.users.map((user: User) => (
                  <div key={user.id} className="flex items-center gap-2">
                    <span>{user.email}</span> <span>{user.role}</span>
                  </div>
                ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              type="button"
            >
              Отмена
            </Button>
            <Button type="submit" className="bg-blue-500">
              Добавить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
